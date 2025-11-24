class ChessGame {
    constructor() {
        this.board = this.initializeBoard();
        this.currentPlayer = 'white';
        this.selectedSquare = null;
        this.moveHistory = [];
        this.capturedPieces = { white: [], black: [] };
        this.isFlipped = false;
        
        this.boardElement = document.getElementById('chessBoard');
        this.currentTurnElement = document.getElementById('currentTurn');
        this.gameStateElement = document.getElementById('gameState');
        this.movesListElement = document.getElementById('movesList');
        this.whiteCapturedElement = document.getElementById('whiteCaptured');
        this.blackCapturedElement = document.getElementById('blackCaptured');
        
        this.init();
    }
    
    initializeBoard() {
        const board = Array(8).fill(null).map(() => Array(8).fill(null));
        
        // Place pieces
        const pieces = {
            0: ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
            1: Array(8).fill('p'),
            6: Array(8).fill('P'),
            7: ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
        };
        
        Object.entries(pieces).forEach(([row, rowPieces]) => {
            rowPieces.forEach((piece, col) => {
                board[row][col] = piece;
            });
        });
        
        return board;
    }
    
    init() {
        this.renderBoard();
        this.bindEvents();
    }
    
    bindEvents() {
        document.getElementById('newGame').addEventListener('click', () => this.newGame());
        document.getElementById('undoMove').addEventListener('click', () => this.undoMove());
        document.getElementById('flipBoard').addEventListener('click', () => this.flipBoard());
    }
    
    renderBoard() {
        this.boardElement.innerHTML = '';
        
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const square = document.createElement('div');
                const displayRow = this.isFlipped ? 7 - row : row;
                const displayCol = this.isFlipped ? 7 - col : col;
                
                square.className = `square ${(row + col) % 2 === 0 ? 'light' : 'dark'}`;
                square.dataset.row = displayRow;
                square.dataset.col = displayCol;
                
                const piece = this.board[displayRow][displayCol];
                if (piece) {
                    const pieceElement = document.createElement('div');
                    pieceElement.className = `piece ${this.getPieceColor(piece)}`;
                    pieceElement.textContent = this.getPieceSymbol(piece);
                    square.appendChild(pieceElement);
                }
                
                // Add coordinates
                if (col === 0) {
                    const rankLabel = document.createElement('div');
                    rankLabel.className = 'rank-label';
                    rankLabel.textContent = this.isFlipped ? row + 1 : 8 - row;
                    square.appendChild(rankLabel);
                }
                
                if (row === 7) {
                    const fileLabel = document.createElement('div');
                    fileLabel.className = 'file-label';
                    fileLabel.textContent = String.fromCharCode(97 + (this.isFlipped ? 7 - col : col));
                    square.appendChild(fileLabel);
                }
                
                square.addEventListener('click', (e) => this.handleSquareClick(e));
                this.boardElement.appendChild(square);
            }
        }
        
        this.updateGameInfo();
    }
    
    getPieceColor(piece) {
        return piece === piece.toUpperCase() ? 'white' : 'black';
    }
    
    getPieceSymbol(piece) {
        const symbols = {
            'k': '♚', 'q': '♛', 'r': '♜', 'b': '♝', 'n': '♞', 'p': '♟',
            'K': '♔', 'Q': '♕', 'R': '♖', 'B': '♗', 'N': '♘', 'P': '♙'
        };
        return symbols[piece] || piece;
    }
    
    handleSquareClick(e) {
        const square = e.currentTarget;
        const row = parseInt(square.dataset.row);
        const col = parseInt(square.dataset.col);
        
        if (this.selectedSquare) {
            if (this.selectedSquare.row === row && this.selectedSquare.col === col) {
                this.clearSelection();
                return;
            }
            
            if (this.isValidMove(this.selectedSquare, { row, col })) {
                this.makeMove(this.selectedSquare, { row, col });
                this.clearSelection();
            } else {
                this.clearSelection();
                this.selectSquare(row, col);
            }
        } else {
            this.selectSquare(row, col);
        }
    }
    
    selectSquare(row, col) {
        const piece = this.board[row][col];
        if (!piece || this.getPieceColor(piece) !== this.currentPlayer) return;
        
        this.selectedSquare = { row, col };
        this.highlightSquare(row, col, 'selected');
        this.highlightPossibleMoves(row, col);
    }
    
    clearSelection() {
        this.selectedSquare = null;
        document.querySelectorAll('.square').forEach(square => {
            square.classList.remove('selected', 'possible-move', 'capture');
        });
    }
    
    highlightSquare(row, col, className) {
        const square = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        if (square) square.classList.add(className);
    }
    
    highlightPossibleMoves(row, col) {
        const piece = this.board[row][col];
        const moves = this.getPossibleMoves(row, col, piece);
        
        moves.forEach(({ row: toRow, col: toCol }) => {
            const targetPiece = this.board[toRow][toCol];
            const className = targetPiece ? 'capture' : 'possible-move';
            this.highlightSquare(toRow, toCol, className);
        });
    }
    
    getPossibleMoves(row, col, piece) {
        const moves = [];
        const pieceType = piece.toLowerCase();
        const color = this.getPieceColor(piece);
        
        switch (pieceType) {
            case 'p':
                moves.push(...this.getPawnMoves(row, col, color));
                break;
            case 'r':
                moves.push(...this.getRookMoves(row, col, color));
                break;
            case 'n':
                moves.push(...this.getKnightMoves(row, col, color));
                break;
            case 'b':
                moves.push(...this.getBishopMoves(row, col, color));
                break;
            case 'q':
                moves.push(...this.getQueenMoves(row, col, color));
                break;
            case 'k':
                moves.push(...this.getKingMoves(row, col, color));
                break;
        }
        
        return moves.filter(move => this.isInBounds(move.row, move.col));
    }
    
    getPawnMoves(row, col, color) {
        const moves = [];
        const direction = color === 'white' ? -1 : 1;
        const startRow = color === 'white' ? 6 : 1;
        
        // Forward move
        if (!this.board[row + direction][col]) {
            moves.push({ row: row + direction, col });
            
            // Double move from start
            if (row === startRow && !this.board[row + 2 * direction][col]) {
                moves.push({ row: row + 2 * direction, col });
            }
        }
        
        // Captures
        [-1, 1].forEach(dc => {
            const newCol = col + dc;
            if (this.isInBounds(row + direction, newCol)) {
                const target = this.board[row + direction][newCol];
                if (target && this.getPieceColor(target) !== color) {
                    moves.push({ row: row + direction, col: newCol });
                }
            }
        });
        
        return moves;
    }
    
    getRookMoves(row, col, color) {
        const moves = [];
        const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];
        
        directions.forEach(([dr, dc]) => {
            for (let i = 1; i < 8; i++) {
                const newRow = row + dr * i;
                const newCol = col + dc * i;
                
                if (!this.isInBounds(newRow, newCol)) break;
                
                const target = this.board[newRow][newCol];
                if (!target) {
                    moves.push({ row: newRow, col: newCol });
                } else {
                    if (this.getPieceColor(target) !== color) {
                        moves.push({ row: newRow, col: newCol });
                    }
                    break;
                }
            }
        });
        
        return moves;
    }
    
    getKnightMoves(row, col, color) {
        const moves = [];
        const knightMoves = [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]];
        
        knightMoves.forEach(([dr, dc]) => {
            const newRow = row + dr;
            const newCol = col + dc;
            
            if (this.isInBounds(newRow, newCol)) {
                const target = this.board[newRow][newCol];
                if (!target || this.getPieceColor(target) !== color) {
                    moves.push({ row: newRow, col: newCol });
                }
            }
        });
        
        return moves;
    }
    
    getBishopMoves(row, col, color) {
        const moves = [];
        const directions = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
        
        directions.forEach(([dr, dc]) => {
            for (let i = 1; i < 8; i++) {
                const newRow = row + dr * i;
                const newCol = col + dc * i;
                
                if (!this.isInBounds(newRow, newCol)) break;
                
                const target = this.board[newRow][newCol];
                if (!target) {
                    moves.push({ row: newRow, col: newCol });
                } else {
                    if (this.getPieceColor(target) !== color) {
                        moves.push({ row: newRow, col: newCol });
                    }
                    break;
                }
            }
        });
        
        return moves;
    }
    
    getQueenMoves(row, col, color) {
        return [...this.getRookMoves(row, col, color), ...this.getBishopMoves(row, col, color)];
    }
    
    getKingMoves(row, col, color) {
        const moves = [];
        const directions = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
        
        directions.forEach(([dr, dc]) => {
            const newRow = row + dr;
            const newCol = col + dc;
            
            if (this.isInBounds(newRow, newCol)) {
                const target = this.board[newRow][newCol];
                if (!target || this.getPieceColor(target) !== color) {
                    moves.push({ row: newRow, col: newCol });
                }
            }
        });
        
        return moves;
    }
    
    isInBounds(row, col) {
        return row >= 0 && row < 8 && col >= 0 && col < 8;
    }
    
    isValidMove(from, to) {
        const piece = this.board[from.row][from.col];
        if (!piece) return false;
        
        const possibleMoves = this.getPossibleMoves(from.row, from.col, piece);
        return possibleMoves.some(move => move.row === to.row && move.col === to.col);
    }
    
    makeMove(from, to) {
        const piece = this.board[from.row][from.col];
        const capturedPiece = this.board[to.row][to.col];
        
        // Record move
        const move = {
            from: { ...from },
            to: { ...to },
            piece,
            capturedPiece,
            player: this.currentPlayer
        };
        
        this.moveHistory.push(move);
        
        // Handle capture
        if (capturedPiece) {
            const capturedColor = this.getPieceColor(capturedPiece);
            this.capturedPieces[capturedColor].push(capturedPiece);
        }
        
        // Move piece
        this.board[to.row][to.col] = piece;
        this.board[from.row][from.col] = null;
        
        // Switch players
        this.currentPlayer = this.currentPlayer === 'white' ? 'black' : 'white';
        
        this.renderBoard();
        this.updateMoveHistory();
    }
    
    undoMove() {
        if (this.moveHistory.length === 0) return;
        
        const lastMove = this.moveHistory.pop();
        
        // Restore piece positions
        this.board[lastMove.from.row][lastMove.from.col] = lastMove.piece;
        this.board[lastMove.to.row][lastMove.to.col] = lastMove.capturedPiece;
        
        // Restore captured pieces
        if (lastMove.capturedPiece) {
            const capturedColor = this.getPieceColor(lastMove.capturedPiece);
            this.capturedPieces[capturedColor].pop();
        }
        
        // Switch back player
        this.currentPlayer = lastMove.player;
        
        this.renderBoard();
        this.updateMoveHistory();
    }
    
    flipBoard() {
        this.isFlipped = !this.isFlipped;
        this.renderBoard();
    }
    
    newGame() {
        this.board = this.initializeBoard();
        this.currentPlayer = 'white';
        this.selectedSquare = null;
        this.moveHistory = [];
        this.capturedPieces = { white: [], black: [] };
        this.renderBoard();
        this.updateMoveHistory();
    }
    
    updateGameInfo() {
        this.currentTurnElement.textContent = `${this.currentPlayer.charAt(0).toUpperCase() + this.currentPlayer.slice(1)} to move`;
        
        // Update captured pieces
        this.whiteCapturedElement.innerHTML = this.capturedPieces.white.map(piece => 
            `<span class="captured-piece">${this.getPieceSymbol(piece)}</span>`
        ).join('');
        
        this.blackCapturedElement.innerHTML = this.capturedPieces.black.map(piece => 
            `<span class="captured-piece">${this.getPieceSymbol(piece)}</span>`
        ).join('');
    }
    
    updateMoveHistory() {
        this.movesListElement.innerHTML = '';
        
        for (let i = 0; i < this.moveHistory.length; i += 2) {
            const moveNumber = Math.floor(i / 2) + 1;
            const whiteMove = this.moveHistory[i];
            const blackMove = this.moveHistory[i + 1];
            
            const moveElement = document.createElement('div');
            moveElement.className = 'move-pair';
            
            let moveText = `${moveNumber}. ${this.formatMove(whiteMove)}`;
            if (blackMove) {
                moveText += ` ${this.formatMove(blackMove)}`;
            }
            
            moveElement.textContent = moveText;
            this.movesListElement.appendChild(moveElement);
        }
        
        this.movesListElement.scrollTop = this.movesListElement.scrollHeight;
    }
    
    formatMove(move) {
        const fromSquare = String.fromCharCode(97 + move.from.col) + (8 - move.from.row);
        const toSquare = String.fromCharCode(97 + move.to.col) + (8 - move.to.row);
        const capture = move.capturedPiece ? 'x' : '';
        return `${this.getPieceSymbol(move.piece)}${capture}${toSquare}`;
    }
}

// Initialize the chess game
document.addEventListener('DOMContentLoaded', () => {
    new ChessGame();
});