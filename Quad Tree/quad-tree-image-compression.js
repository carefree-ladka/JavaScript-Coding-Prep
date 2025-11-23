// Quad Tree for Image Compression - Recursive image subdivision
class ImageQuadTree {
  constructor(x, y, size, pixels) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.pixels = pixels;
    this.color = null;
    this.children = null;
    this.isLeaf = true;
    
    this.compress();
  }
  
  compress() {
    if (this.size === 1) {
      this.color = this.pixels[this.y][this.x];
      return;
    }
    
    // Check if all pixels in region have same color
    const firstColor = this.pixels[this.y][this.x];
    let uniform = true;
    
    for (let i = this.y; i < this.y + this.size && uniform; i++) {
      for (let j = this.x; j < this.x + this.size && uniform; j++) {
        if (this.pixels[i][j] !== firstColor) {
          uniform = false;
        }
      }
    }
    
    if (uniform) {
      this.color = firstColor;
    } else {
      // Subdivide into 4 quadrants
      this.isLeaf = false;
      const halfSize = this.size / 2;
      
      this.children = [
        new ImageQuadTree(this.x, this.y, halfSize, this.pixels), // NW
        new ImageQuadTree(this.x + halfSize, this.y, halfSize, this.pixels), // NE
        new ImageQuadTree(this.x, this.y + halfSize, halfSize, this.pixels), // SW
        new ImageQuadTree(this.x + halfSize, this.y + halfSize, halfSize, this.pixels) // SE
      ];
    }
  }
  
  getCompressionRatio() {
    const totalPixels = this.size * this.size;
    const compressedNodes = this.countNodes();
    return totalPixels / compressedNodes;
  }
  
  countNodes() {
    if (this.isLeaf) return 1;
    return 1 + this.children.reduce((sum, child) => sum + child.countNodes(), 0);
  }
  
  reconstruct() {
    const result = Array.from({length: this.size}, () => new Array(this.size));
    this.fillRegion(result, this.x, this.y, this.size);
    return result;
  }
  
  fillRegion(result, startX, startY, size) {
    if (this.isLeaf) {
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          result[startY + i][startX + j] = this.color;
        }
      }
    } else {
      const halfSize = size / 2;
      this.children[0].fillRegion(result, startX, startY, halfSize);
      this.children[1].fillRegion(result, startX + halfSize, startY, halfSize);
      this.children[2].fillRegion(result, startX, startY + halfSize, halfSize);
      this.children[3].fillRegion(result, startX + halfSize, startY + halfSize, halfSize);
    }
  }
}

// Test Cases
const image = [
  [1, 1, 0, 0],
  [1, 1, 0, 0],
  [2, 2, 3, 3],
  [2, 2, 3, 3]
];

const compressedImage = new ImageQuadTree(0, 0, 4, image);
console.log("Compression ratio:", compressedImage.getCompressionRatio());
console.log("Reconstructed:", compressedImage.reconstruct());