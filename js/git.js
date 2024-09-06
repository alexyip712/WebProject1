fetch('https://api.github.com/users/alexyip712/repos')
    .then(res => {
        return res.json();

    })
    .then(data => {
        data.sort(function (a, b) {
            return b.id - a.id;
        });
        //console.log(data);
        let tabledata = "";
        data.map((values) => {
            const cdate = new Date(values.created_at);
            const fdate = `${cdate.getFullYear()}-${(cdate.getMonth() + 1).toString().padStart(2, '0')}-${cdate.getDate().toString().padStart(2, '0')}`;
            tabledata += `            <tr>
              <td>${values.name}</td>
              <td>${fdate}</td>
              <td>${values.language}</td>
              <td><a href="${values.html_url}" target="_blank">${values.html_url}</a></td>
            </tr>`;
        })
        document.getElementById('tableBody').innerHTML = tabledata;

    })

let add = 1;

function sort() {
    add += 1;
    console.log(add)
    fetch('https://api.github.com/users/alexyip712/repos')
    .then(res => {
        return res.json();
    })
    .then(data => {
        if(add%2==0){data.sort(function (a, b) {
            return a.id - b.id;
        })}else{data.sort(function (a, b) {
            return b.id - a.id;})}
        ;
        //console.log(data);
        let tabledata = "";
        data.map((values) => {
            const cdate = new Date(values.created_at);
            const fdate = `${cdate.getFullYear()}-${(cdate.getMonth() + 1).toString().padStart(2, '0')}-${cdate.getDate().toString().padStart(2, '0')}`;
            tabledata += `            <tr>
              <td>${values.name}</td>
              <td>${fdate}</td>
              <td>${values.language}</td>
              <td><a href="${values.html_url}">${values.html_url}</a></td>
            </tr>`;
        })
        document.getElementById('tableBody').innerHTML = tabledata;

    })
}

/*function latest() {
    const botton = "Latest"
    document.getElementById('dropdown').innerHTML = botton;
    fetch('https://api.github.com/users/alexyip712/repos')
    .then(res => {
        return res.json();
    })
    .then(data => {
        data.sort(function (a, b) {
            return b.id - a.id;
        });
        //console.log(data);
        let tabledata = "";
        data.map((values) => {
            const cdate = new Date(values.created_at);
            const fdate = `${cdate.getFullYear()}-${(cdate.getMonth() + 1).toString().padStart(2, '0')}-${cdate.getDate().toString().padStart(2, '0')}`;
            tabledata += `            <tr>
              <td>${values.name}</td>
              <td>${fdate}</td>
              <td>${values.language}</td>
              <td><a href="${values.html_url}">${values.html_url}</a></td>
            </tr>`;
        })
        document.getElementById('tableBody').innerHTML = tabledata;

    })
}

function earliest() {
    const botton = "Earliest";
    document.getElementById('dropdown').innerHTML = botton;

    fetch('https://api.github.com/users/alexyip712/repos')
    .then(res => {
        return res.json();
    })
    .then(data => {
        data.sort(function (a, b) {
            return a.id - b.id;
        });
        //console.log(data);
        let tabledata = "";
        data.map((values) => {
            const cdate = new Date(values.created_at);
            const fdate = `${cdate.getFullYear()}-${(cdate.getMonth() + 1).toString().padStart(2, '0')}-${cdate.getDate().toString().padStart(2, '0')}`;
            tabledata += `            <tr>
              <td>${values.name}</td>
              <td>${fdate}</td>
              <td>${values.language}</td>
              <td><a href="${values.html_url}">${values.html_url}</a></td>
            </tr>`;
        })
        document.getElementById('tableBody').innerHTML = tabledata;

    })
}*/
