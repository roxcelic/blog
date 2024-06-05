const user = 'roxcelic';
const apirepo = `https://api.github.com/users/${user}`;

export async function gethub(host){
    try {
        const response = await fetch(apirepo + '/repos');
        const data = await response.json();

        data.forEach(v => {
            /**name */
            let name = document.createElement("p");
            name.textContent = v.name;

            /**description */
            let desc = document.createElement("p");
            desc.textContent = v.description

            /**line */
            let line = document.createElement("div");
            line.className = "lineline";

            /**link */
            let link = document.createElement("a");
            link.textContent = "view it here";
            link.href = v.html_url;

            host.append(name);
            host.append(desc);
            host.append(link);
            host.append(line);

        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}