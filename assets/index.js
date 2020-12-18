$(function () {
    $('#btnadicionar').click(function () {
        $('#modalCadatro').modal();
    });

    for (let index = 2; index > 0; index--) {
        var url = "https://reqres.in/api/users?page=" + index;
        $.ajax({
            url: url,
            dataType: 'json',
            success: function (response) {
                response['data'].forEach(prenchertabela);

                function prenchertabela(item) {
                    var tabela = document.getElementById('tblUsuarios');
                    var numeroLinhas = tabela.rows.length;
                    var linha = tabela.insertRow(numeroLinhas);
                    var celula1 = linha.insertCell(0);
                    var celula2 = linha.insertCell(1);
                    var celula3 = linha.insertCell(2);
                    celula1.innerHTML = item['id'];
                    celula2.innerHTML = item['first_name'];
                    celula3.innerHTML = item['email'];
                }
            }
        });
    }

    $('#btnSalvar').click(function () {
        var nome = document.getElementById('nome');
        var job = document.getElementById('job');
        if (nome.value != "" && job.value != "") {
            $.ajax({
                type: "POST",
                url: "https://reqres.in/api/users",
                dataType: "json",
                data: { "name": nome.value, "job": job.value },
                success: function (response) {
                    $('#modalCadatro').modal('hide');
                    Swal.fire(
                        'Sucesso!',
                        'Data do cadastro - ' + response['createdAt'],
                        'success'
                    );
                },
                error: function (resposta) {
                    console.log(resposta);
                }
            })
        }
    });

    $('#btnBuscar').click(function () {
        var codigoFuncionario = document.getElementById('codigoFuncionario');
        
        if (codigoFuncionario.value != "") {

            var nomeFuncionario = document.getElementById('nomeFuncionario');
            var sobrenome = document.getElementById('sobrenome');
            var avatar = document.getElementById('avatar');
            var email = document.getElementById('email');

            $.ajax({
                url: "https://reqres.in/api/users/" + codigoFuncionario.value,
                dataType: "json",
                success: function (response) {
                    nomeFuncionario.value = response['data']['first_name'];
                    avatar.src = response['data']['avatar'];
                    sobrenome.value = response['data']['last_name'];
                    email.value = response['data']['email'];
                    $('#modalVisualizar').modal();
                },
                error: function (resposta) {
                    console.log(resposta);
                }
            })
        }
    });
});
