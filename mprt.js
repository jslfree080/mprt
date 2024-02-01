class Problem {
    #s;

    constructor(s) {
        this.#s = s;
    }

    static suffix = "https://rest.uniprot.org/uniprotkb/";
    static prefix = ".fasta";
    static motifRegex = /N(?=[^P][ST][^P])/g;

    solve() {
        let result = "";
        let space = {};
        const uniprotIds = this.#s.split("\n");
        const array = uniprotIds.map(elm => Problem.suffix + elm.split('_')[0] + Problem.prefix);
        array.map(url => space[url] = uniprotIds[array.indexOf(url)]);
        // console.log(space);

        for (const url of array) {
            const seq = fetch(url)
                .then(response => response.text())
                .then(data => data.split('\n').slice(1).join(''))
                .then(sequence => sequence)
            const positions = [];
            let match;
            seq
                .then(sequence => {
                    while ((match = Problem.motifRegex.exec(sequence)) !== null) {
                        positions.push(match.index + 1);
                    }
                    return positions;
                })
                .then(positions => {
                    if (positions.length > 0) {
                        console.log(space[url]);
                        console.log(positions.join(' '));
                    }
                });
        }
    }
}

problem = new Problem(
    `P01880_DTC_HUMAN
P19827_ITH1_HUMAN
P04441_HG2A_MOUSE
P40308
P0A4Y7
P00744_PRTZ_BOVIN
O14977
Q5FTZ8
Q0AYI5
P01047_KNL2_BOVIN
B5ZC00
P03395_ENV_MLVFR
B4S2L7`
);
problem.solve();