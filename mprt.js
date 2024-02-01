class Problem {
    #s;

    constructor(s) {
        this.#s = s;
    }

    static suffix = "https://rest.uniprot.org/uniprotkb/";
    static prefix = ".fasta";
    static motifRegex = /N(?=[^P][ST][^P])/g;

    async solve() {
        const uniprotIds = this.#s.split("\n");
        for (const id of uniprotIds) {
            const url = Problem.suffix + id.split('_')[0] + Problem.prefix;
            try {
                const response = await fetch(url);
                const data = await response.text();
                const sequence = data.split('\n').slice(1).join('');
                const positions = [];
                let match;
                while ((match = Problem.motifRegex.exec(sequence)) !== null) {
                    positions.push(match.index + 1);
                }
                if (positions.length > 0) {
                    console.log(id);
                    console.log(positions.join(' '));
                }
            } catch (error) {
                console.error(`Failed to fetch sequence for ${id}: ${error}`);
            }
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
problem.solve(); // node mprt.js