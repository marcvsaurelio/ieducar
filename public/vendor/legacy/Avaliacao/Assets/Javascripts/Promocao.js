// variaveis usadas pelo modulo Frontend/Process.js

processOptions.validatesResourcesAfterSearch = false;
processOptions.showNewSearchButton = false;
processOptions.clearSearchDiv = true;

// #DEPRECADO, migrar para novo padrao processOptions
const PAGE_URL_BASE      = 'promocao';
const API_URL_BASE       = 'promocaoApi';
const RESOURCE_NAME      = 'promocao';
const RESOURCES_NAME     = 'quantidade_matriculas';
let POST_LABEL           = '';
let DELETE_LABEL         = '';
let SEARCH_ORIENTATION   = '';

// funcoes usados pelo modulo Frontend/Process.js
let onClickSelectAllEvent = false;
let onClickActionEvent    = false;
let onClickDeleteEvent    = false;

let setTableSearchDetails = function(){};

let postPromocaoMatricula = function() {
  let options = {
    url : '/enrollments-promotion',
    dataType : 'json',
    type: 'post',
    data : {
      instituicao_id : $j('#instituicao_id').val(),
      ano : $j('#ano').val(),
      escola : $j('#escola').val(),
      curso : $j('#curso').val(),
      serie : $j('#serie').val(),
      turma : $j('#turma').val(),
      matricula: $j('#matricula').val(),
      situacaoMatricula: $j('#situacaoMatricula').val(),
      regras_avaliacao_id : $j('#regras_avaliacao_id').val()
    },
    success : handlePostPromocaoMatricula,
    error : handlePostPromocaoMatricula
  };

  postResource(options);
};

function handlePostPromocaoMatricula(dataResponse) {
  if (dataResponse.status === 'notice') {
    messageUtils.notice(dataResponse.message);
    return;
  }

  messageUtils.success(dataResponse.message);
}

function handleSearch($resultTable, dataResponse) {
  let $text = $j('<div />');

  let html = `
    <table id="atualizacao-matriculas-resultados" width="100%">
        <tr>
            <th colspan="2">Matrículas</th>
        </tr>
        <tr>
            <td>Ano</td>
            <td>${dataResponse.ano}</td>
        </tr>
        <tr>
            <td>Instituição</td>
            <td>${dataResponse.instituicao}</td>
        </tr>
        <tr>
            <td>Escola</td>
            <td>${dataResponse.escola}</td>
        </tr>
        <tr>
            <td>Curso</td>
            <td>${dataResponse.curso}</td>
        </tr>
        <tr>
            <td>Série</td>
            <td>${dataResponse.serie}</td>
        </tr>
        <tr>
            <td>Turma</td>
            <td>${dataResponse.turma}</td>
        </tr>
        <tr>
            <td>Aluno</td>
            <td>${dataResponse.matricula}</td>
        </tr>
        <tr>
            <td>Situação</td>
            <td>${dataResponse.situacaoMatricula}</td>
        </tr>
        <tr>
            <td>Regra de avaliação</td>
            <td>${dataResponse.regraAvaliacao}</td>
        </tr>
        <tr>
            <td colspan="2"><b>Quantidade de matrículas filtradas: ${dataResponse.quantidade_matriculas}<b></td>
        </tr>
    </table>
  `;

  console.log($resultTable, dataResponse);

  $j('<span />')
    .html(html)
    .attr('class','qnt-matriculas')
    .appendTo($text);

  $j('<input />').attr('id', 'promover-matricula')
    .attr('href', '#')
    .attr('type','button')
    .attr('class','btn-green')
    .attr('value','Iniciar processo')
    .bind('click', postPromocaoMatricula)
    .appendTo($text);

  $j('<span />').html(' ').appendTo($text);

  $j('<td />').html($text).appendTo($j('<tr />').appendTo($resultTable));
}


let showNewSearchButton = function () {};
