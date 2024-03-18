const name = document.getElementById("name");
const email = document.getElementById("email");
const rollNumber = document.getElementById("rollNumber");
const phone = document.getElementById("phone");
const create = document.getElementById("createAccount");
const cName = document.getElementById("cName");
const bStocks = document.getElementById("bStocks");
let accNum;

const createAccount = async () => {
  try {
    const bodyData = {
      name: name.value,
      email: email.value,
      rollNumber: rollNumber.value,
      phone: phone.value,
    };
    const bodyJson = JSON.stringify(bodyData);

    const resp = await fetch("https://customer-analytics-34146.my.salesforce-sites.com/services/apexrest/createAccount", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: bodyJson
    });

    const data = await resp.json();
    accNum = data.accountNumber || "BFHL0018647"; 
    console.log(data);
  } catch (error) {
    console.error("Error in creating account:", error.message);
  }
};

const buyStocks = async () => {
  try {
    const buyBody = {
      "company": cName.value,
      "currentPrice": "1557.05",
      "accountNumber": accNum,
      "githubRepoLink": "https://github.com/rajme-git/Bajaj_2110992107"
    };
    const buyBodyJson = JSON.stringify(buyBody);

    const response = await fetch("https://customer-analytics-34146.my.salesforce-sites.com/services/apexrest/buyStocks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "bfhl-auth": rollNumber.value, 
      },
      body: buyBodyJson,
    });

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error in buying stocks:", error.message);
  }
};

create.addEventListener("click", createAccount);
bStocks.addEventListener("click", buyStocks);
