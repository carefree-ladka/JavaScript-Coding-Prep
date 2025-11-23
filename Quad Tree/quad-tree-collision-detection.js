// Quad Tree for Collision Detection - Game physics optimization
class GameObject {
  constructor(x, y, width, height, id) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.id = id;
  }
  
  getBounds() {
    return new Rectangle(this.x, this.y, this.width, this.height);
  }
  
  intersects(other) {
    return !(this.x > other.x + other.width ||
             this.x + this.width < other.x ||
             this.y > other.y + other.height ||
             this.y + this.height < other.y);
  }
}

class CollisionQuadTree {
  constructor(boundary, maxObjects = 10, maxLevels = 5, level = 0) {
    this.boundary = boundary;
    this.maxObjects = maxObjects;
    this.maxLevels = maxLevels;
    this.level = level;
    this.objects = [];
    this.nodes = [];
  }
  
  clear() {
    this.objects = [];
    for (let node of this.nodes) {
      node.clear();
    }
    this.nodes = [];
  }
  
  split() {
    const subWidth = this.boundary.width / 2;
    const subHeight = this.boundary.height / 2;
    const x = this.boundary.x;
    const y = this.boundary.y;
    
    this.nodes[0] = new CollisionQuadTree(
      new Rectangle(x + subWidth, y, subWidth, subHeight),
      this.maxObjects, this.maxLevels, this.level + 1
    );
    this.nodes[1] = new CollisionQuadTree(
      new Rectangle(x, y, subWidth, subHeight),
      this.maxObjects, this.maxLevels, this.level + 1
    );
    this.nodes[2] = new CollisionQuadTree(
      new Rectangle(x, y + subHeight, subWidth, subHeight),
      this.maxObjects, this.maxLevels, this.level + 1
    );
    this.nodes[3] = new CollisionQuadTree(
      new Rectangle(x + subWidth, y + subHeight, subWidth, subHeight),
      this.maxObjects, this.maxLevels, this.level + 1
    );
  }
  
  getIndex(obj) {
    let index = -1;
    const verticalMidpoint = this.boundary.x + this.boundary.width / 2;
    const horizontalMidpoint = this.boundary.y + this.boundary.height / 2;
    
    const topQuadrant = obj.y < horizontalMidpoint && obj.y + obj.height < horizontalMidpoint;
    const bottomQuadrant = obj.y > horizontalMidpoint;
    
    if (obj.x < verticalMidpoint && obj.x + obj.width < verticalMidpoint) {
      if (topQuadrant) index = 1;
      else if (bottomQuadrant) index = 2;
    } else if (obj.x > verticalMidpoint) {
      if (topQuadrant) index = 0;
      else if (bottomQuadrant) index = 3;
    }
    
    return index;
  }
  
  insert(obj) {
    if (this.nodes.length > 0) {
      const index = this.getIndex(obj);
      if (index !== -1) {
        this.nodes[index].insert(obj);
        return;
      }
    }
    
    this.objects.push(obj);
    
    if (this.objects.length > this.maxObjects && this.level < this.maxLevels) {
      if (this.nodes.length === 0) this.split();
      
      let i = 0;
      while (i < this.objects.length) {
        const index = this.getIndex(this.objects[i]);
        if (index !== -1) {
          this.nodes[index].insert(this.objects.splice(i, 1)[0]);
        } else {
          i++;
        }
      }
    }
  }
  
  retrieve(returnObjects, obj) {
    const index = this.getIndex(obj);
    if (index !== -1 && this.nodes.length > 0) {
      this.nodes[index].retrieve(returnObjects, obj);
    }
    
    returnObjects.push(...this.objects);
    return returnObjects;
  }
}

// Test Cases
const gameArea = new Rectangle(0, 0, 800, 600);
const collisionTree = new CollisionQuadTree(gameArea);

// Add game objects
const player = new GameObject(100, 100, 32, 32, "player");
const enemy1 = new GameObject(150, 120, 24, 24, "enemy1");
const enemy2 = new GameObject(500, 300, 24, 24, "enemy2");

collisionTree.insert(player);
collisionTree.insert(enemy1);
collisionTree.insert(enemy2);

// Check collisions for player
const possibleCollisions = [];
collisionTree.retrieve(possibleCollisions, player);
console.log("Possible collisions:", possibleCollisions.map(obj => obj.id));