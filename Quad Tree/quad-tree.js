// Quad Tree Implementation - Spatial data structure for 2D space partitioning
class Point {
  constructor(x, y, data = null) {
    this.x = x;
    this.y = y;
    this.data = data;
  }
}

class Rectangle {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  
  contains(point) {
    return point.x >= this.x && point.x < this.x + this.width &&
           point.y >= this.y && point.y < this.y + this.height;
  }
  
  intersects(range) {
    return !(range.x > this.x + this.width ||
             range.x + range.width < this.x ||
             range.y > this.y + this.height ||
             range.y + range.height < this.y);
  }
}

class QuadTree {
  constructor(boundary, capacity = 4) {
    this.boundary = boundary;
    this.capacity = capacity;
    this.points = [];
    this.divided = false;
  }
  
  insert(point) {
    if (!this.boundary.contains(point)) return false;
    
    if (this.points.length < this.capacity) {
      this.points.push(point);
      return true;
    }
    
    if (!this.divided) this.subdivide();
    
    return this.northeast.insert(point) || this.northwest.insert(point) ||
           this.southeast.insert(point) || this.southwest.insert(point);
  }
  
  subdivide() {
    const x = this.boundary.x;
    const y = this.boundary.y;
    const w = this.boundary.width / 2;
    const h = this.boundary.height / 2;
    
    this.northeast = new QuadTree(new Rectangle(x + w, y, w, h), this.capacity);
    this.northwest = new QuadTree(new Rectangle(x, y, w, h), this.capacity);
    this.southeast = new QuadTree(new Rectangle(x + w, y + h, w, h), this.capacity);
    this.southwest = new QuadTree(new Rectangle(x, y + h, w, h), this.capacity);
    
    this.divided = true;
  }
  
  query(range, found = []) {
    if (!this.boundary.intersects(range)) return found;
    
    for (let point of this.points) {
      if (range.contains(point)) found.push(point);
    }
    
    if (this.divided) {
      this.northeast.query(range, found);
      this.northwest.query(range, found);
      this.southeast.query(range, found);
      this.southwest.query(range, found);
    }
    
    return found;
  }
}

// Test Cases
const boundary = new Rectangle(0, 0, 100, 100);
const qt = new QuadTree(boundary);

// Insert points
qt.insert(new Point(25, 25, "A"));
qt.insert(new Point(75, 25, "B"));
qt.insert(new Point(25, 75, "C"));
qt.insert(new Point(75, 75, "D"));
qt.insert(new Point(50, 50, "E"));

// Query range
const range = new Rectangle(20, 20, 60, 60);
const found = qt.query(range);
console.log(found.map(p => p.data)); // ["A", "E"]