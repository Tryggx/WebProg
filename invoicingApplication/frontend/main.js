function getAllInvoices() {
    var invoiceList = document.getElementById("invoiceList");
    invoiceList.innerHTML='';
    invoiceList.className="invoiceList";

    var url = 'http://localhost:3000/api/vEx1/invoices';

    axios.get(url)
        .then(function (response) {
            if (response.data !== null) {
                for (var i = 0; i < response.data.length; i++) {
                    var invoiceItem = document.createElement("span");
                    var invoiceItemLetter = document.createElement("span");
                    invoiceItemLetter.textContent = ('I');
                    invoiceItem.className = "invoiceItem";
                    invoiceItemLetter.className = "invoiceItemLetter";
                    invoiceItem.textContent = "nvoice nr: " + response.data[i].invoice_number + ", invoiced by: " + response.data[i].invoiced_by + ", to: " + response.data[i].invoiced_to + ", amount: " + response.data[i].amount + "\n";
                    console.log(response.data[i].paid_status);
                    invoiceItem.insertBefore(invoiceItemLetter, invoiceItem.firstChild);
                    invoiceList.appendChild(invoiceItem);
                }
            }
        })
        .catch(function (error) {
            //When unsuccessful, print the error.
            console.log(error);
        });

}

function onSubmitClick(){
    var invoiceNumber = document.getElementById("iNumber").value;
    var invoicedBy = document.getElementById("iToName").value;
    var invoicedTo = document.getElementById("iByName").value;
    var amount = document.getElementById("iAmount").value;
    var url = 'http://localhost:3000/api/vEx1/invoices';
    var data = {
        invoice_number: invoiceNumber,
        invoiced_by: invoicedBy,
        invoiced_to: invoicedTo,
        amount: amount,
        paid_status: False
    };
    if (invoiceNumber != ""  && amount >= 0) {
        axios.post(url, data)
            .then(function (response) {
                console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    getAllInvoices();
};



getAllInvoices();