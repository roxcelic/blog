document.getElementById('sortInput').addEventListener('input', function() {
    let query = this.value.toLowerCase();
    let container = document.querySelector('#blogposts ul');
    let posts = Array.from(container.querySelectorAll('.post'));
    posts.sort((a, b) => {
        let aScore = calculateMatchScore(a.id.toLowerCase(), query);
        let bScore = calculateMatchScore(b.id.toLowerCase(), query);
        return bScore - aScore; 
    });
    posts.forEach(post => container.appendChild(post));
});

function calculateMatchScore(text, query) {
    let textWords = text.split(/[\|,]/);
    let queryWords = query.split(' ');
    let score = 0;
    queryWords.forEach(qWord => {
        textWords.forEach(tWord => {
            if (tWord.includes(qWord)) {
                score++;
            }
        });
    });
    return score;
}
