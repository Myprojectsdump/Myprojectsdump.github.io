// tests/unit/revealThresholdMath.test.ts

import { describe, it, expect } from 'vitest';

export class OccupancyGrid {
  public cols: number;
  public rows: number;
  public grid: boolean[];

  constructor(cols: number, rows: number) {
    this.cols = cols;
    this.rows = rows;
    this.grid = new Array(cols * rows).fill(false);
  }

  public clearCircle(cx: number, cy: number, radiusNorm: number): void {
    const rCols = radiusNorm * this.cols;
    const rRows = radiusNorm * this.rows;

    const minC = Math.max(0, Math.floor((cx - radiusNorm) * this.cols));
    const maxC = Math.min(this.cols - 1, Math.ceil((cx + radiusNorm) * this.cols));
    const minR = Math.max(0, Math.floor((cy - radiusNorm) * this.rows));
    const maxR = Math.min(this.rows - 1, Math.ceil((cy + radiusNorm) * this.rows));

    for (let r = minR; r <= maxR; r++) {
      for (let c = minC; c <= maxC; c++) {
        const dc = (c - cx * this.cols) / rCols;
        const dr = (r - cy * this.rows) / rRows;
        if (dc * dc + dr * dr <= 1.0) {
          this.grid[r * this.cols + c] = true;
        }
      }
    }
  }

  public getClearedPercentage(
    minX: number = 0,
    maxX: number = 1,
    minY: number = 0,
    maxY: number = 1
  ): number {
    const startCol = Math.max(0, Math.floor(minX * this.cols));
    const endCol = Math.min(this.cols - 1, Math.floor(maxX * this.cols));
    const startRow = Math.max(0, Math.floor(minY * this.rows));
    const endRow = Math.min(this.rows - 1, Math.floor(maxY * this.rows));

    let cleared = 0;
    let total = 0;

    for (let r = startRow; r <= endRow; r++) {
      for (let c = startCol; c <= endCol; c++) {
        total++;
        if (this.grid[r * this.cols + c]) {
          cleared++;
        }
      }
    }

    return total > 0 ? (cleared / total) * 100 : 0;
  }

  public reset(): void {
    this.grid.fill(false);
  }
}

describe('Reveal Threshold Math & Occupancy Grid Verification', () => {
  it('initializes grid at 0% cleared', () => {
    const grid = new OccupancyGrid(64, 36);
    expect(grid.getClearedPercentage()).toBe(0);
  });

  it('clearing circle updates percentage accurately without GPU readbacks', () => {
    const grid = new OccupancyGrid(64, 36);
    // Clear center area
    grid.clearCircle(0.5, 0.5, 0.15);
    const cleared = grid.getClearedPercentage();
    expect(cleared).toBeGreaterThan(5);
    expect(cleared).toBeLessThan(25);
  });

  it('detects sub-region threshold >= 55% for mirror notes', () => {
    const grid = new OccupancyGrid(64, 36);
    // Note 1 bounding box: around (0.22, 0.25)
    const minX = 0.12, maxX = 0.32, minY = 0.18, maxY = 0.32;
    expect(grid.getClearedPercentage(minX, maxX, minY, maxY)).toBe(0);

    // Wipe repeatedly across note 1
    grid.clearCircle(0.22, 0.25, 0.08);
    grid.clearCircle(0.20, 0.24, 0.08);
    grid.clearCircle(0.24, 0.26, 0.08);

    const note1Cleared = grid.getClearedPercentage(minX, maxX, minY, maxY);
    expect(note1Cleared).toBeGreaterThanOrEqual(55);
  });

  it('scratch card grid (32x20) triggers auto-dissolve at >= 45%', () => {
    const scratchGrid = new OccupancyGrid(32, 20);
    expect(scratchGrid.getClearedPercentage()).toBe(0);

    // Scratch across multiple rows to clear over 45%
    for (let y = 0.3; y <= 0.7; y += 0.2) {
      for (let x = 0.15; x <= 0.85; x += 0.1) {
        scratchGrid.clearCircle(x, y, 0.18);
      }
    }

    const cardCleared = scratchGrid.getClearedPercentage();
    expect(cardCleared).toBeGreaterThanOrEqual(45);
  });

  it('reset sets cleared percentage back to 0%', () => {
    const grid = new OccupancyGrid(64, 36);
    grid.clearCircle(0.5, 0.5, 0.3);
    expect(grid.getClearedPercentage()).toBeGreaterThan(10);
    grid.reset();
    expect(grid.getClearedPercentage()).toBe(0);
  });
});
