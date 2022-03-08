$(document).ready(function () {
    $('#MessageContainer').hide();
    $('#myModal').on('show.bs.modal', function (event) {

        CleanForm();
        let button = $(event.relatedTarget)
        let BookID = button.data('id')
        let Type = button.data('type')
        let modal = $(this)

        modal.find('.modal-title').text(Type + " Book Data");

        if (Type == "Edit") {
            $.ajax({
                type: "POST",
                url: Address + "/Book/" + Type,
                data: {
                    BookID : BookID
                },
                success: function (Data) {
                    $('#MessageContainer').hide();
                    let JSONData = Data.Data;
                    if (JSONData != "") {
                        $("#txtBookID").val(JSONData.BookID);
                        $("#txtBookName").val(JSONData.BookName);
                        $("#txtBookDesc").val(JSONData.BookDesc);
                        $("#txtBookQty").val(JSONData.BookQty);

                    }
                    else {
                        $('#MessageContainer').show();
                        $('#Message').text("Invalid request");
                    }
                },
                error: function (data) {
                    $('#MessageContainer').show();
                    $('#Message').text("Invalid request");
                }
            });
        }
    });
});

function CleanForm() {
    $("#txtBookID").val("")
    $("#txtBookQty").val("");
    $("#txtBookDesc").val("");
    $("#txtBookName").val("");
    $('#MessageContainer').hide();
    $('#Message').text("");
}

function Delete(ID) {
    let ConfirmDelete = confirm("Are you sure want to delete this record?");
    if (ConfirmDelete == true) {
        $.ajax({
            type: "POST",
            url: Address + "/Book/Delete",
            data: "BookID=" + ID ,
            success: function (Data) {
                LoadResult(Data);
            },
            error: function (Data) {
                alert("Error : " + Data);
            }
        });
    }
}

function Borrow(ID) {
    console.log("asd");
    let confirmBorrow = confirm("Are you sure you want to borrow this book?");
    if (confirmBorrow) {
        $.ajax({
            type:"POST",
            url: Address + "/Book/Borrow",
            data: "BookID=" + ID,
            success: function (Data) {
                LoadResult(Data);
            },
            error: function (Data) {
                alert("Error : " + Data);
            }
        })
    }
}

function LoadResult(Data) {
    var Value = JSON.parse(JSON.stringify(Data));

    if (Value.Status == "Success") {
        $('#MessageContainer').show();
        $('#Message').text(Value.Message);

        setTimeout(function () {
            window.location = Value.URL;
        }, 2000)
    }
    else {
        $('#MessageContainer').show();
        $('#Message').text(Value.Message);
    }
}


function addData() {
    CleanForm()
}