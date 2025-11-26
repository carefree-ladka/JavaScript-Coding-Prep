class VotingPoll {
    constructor() {
        this.votes = [0, 0, 0, 0];
        this.totalVotes = 0;
        this.init();
    }

    init() {
        document.querySelectorAll('.vote-btn').forEach((btn, index) => {
            btn.addEventListener('click', () => this.vote(index));
        });
    }

    vote(optionIndex) {
        this.votes[optionIndex]++;
        this.totalVotes++;
        this.updateUI();
    }

    updateUI() {
        document.getElementById('totalCount').textContent = this.totalVotes;
        
        document.querySelectorAll('.option').forEach((option, index) => {
            const percentage = this.totalVotes > 0 ? (this.votes[index] / this.totalVotes * 100) : 0;
            const progressBar = option.querySelector('.progress-bar');
            const percentageSpan = option.querySelector('.percentage');
            const voteCount = option.querySelector('.vote-count');
            
            progressBar.style.width = `${percentage}%`;
            percentageSpan.textContent = `${Math.round(percentage)}%`;
            voteCount.textContent = `${this.votes[index]} vote${this.votes[index] !== 1 ? 's' : ''}`;
        });
    }
}

new VotingPoll();