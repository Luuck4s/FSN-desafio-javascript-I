// Base a ser utilizada
const alunosDaEscola = [
  { nome: "Henrique", notas: [], cursos: [], faltas: 5 },
  { nome: "Edson", notas: [], cursos: [], faltas: 2 },
  { nome: "Bruno", notas: [10, 9.8, 9.6], cursos: [], faltas: 0 },
  {
    nome: "Guilherme",
    notas: [10, 9.8, 9.6],
    cursos: [{ nomeDoCurso: "Full Stack", dataMatricula: new Date() }],
    faltas: 0
  },
  { nome: "Carlos", notas: [], cursos: [], faltas: 0 },
  {
    nome: "Lucca",
    notas: [10, 9.8, 9.6],
    cursos: [{ nomeDoCurso: "UX", dataMatricula: new Date() }],
    faltas: 0
  }
];

/**
 * Essa função irá receber uma *string* que é nome do aluno a ser criado.
 * E seguindo o modelo de aluno, o mesmo deverá ser inserido na lista de alunos.
 * A função deve devolver um feedback de sucesso, caso o aluno seja inserido corretamente.
 * Caso o nome do aluno seja menor que 1 a função retorna error.
 *
 * @param {string} nome
 */

function adicionarAluno(nome) {
  if (nome.trim().length > 1) {
    const alunoModel = {
      nome,
      notas: [],
      cursos: [],
      faltas: 0
    };

    alunosDaEscola.push(alunoModel);

    return console.log("Aluno adicionado com sucesso!");
  }

  throw nome;
}

/**
 * Com essa função o usuário poderá ver todos os alunos cadastrados atualmente no sistema.
 * Vale dizer que As informações deverão ser exibidas em um formato amigável.
 *
 */
function listarAlunos() {
  let courses = [];

  console.log("LISTA DE ALUNOS");

  for (const aluno of alunosDaEscola) {
    courses = aluno.cursos.map(curso => curso.nomeDoCurso);

    console.log(
      `\nNome: ${aluno.nome} ${
        aluno.notas.length > 0 ? `| Notas: ${aluno.notas}` : ""
      } ${aluno.cursos.length > 0 ? `| Cursos: ${courses}` : ""} | Faltas: ${
        aluno.faltas
      }\n`
    );
  }
}

/**
 * Função criada para evitar repetição de código, verifica se um aluno já está matriculado
 * e caso não esteja retornar uma mensagem no console.
 * @param {string} nome
 */
function verificarAlunoMatriculado(nome) {
  let resultSearch = alunosDaEscola.filter(aluno => aluno.nome == nome);

  if (resultSearch.length == 0) {
    throw `O ${nome || "aluno"} não foi encontrado no sistema.`;
  }

  return resultSearch;
}

/**
 * Por meio dessa função, podemos pesquisar um aluno por nome na lista de aluno. Ela deverá exibir
 * um feedback, tanto para quando encontrar o aluno, tanto quando não encontrar. E deverá devolver um
 * aluno em seu retorno.
 *
 * @param {string} nome
 */
function buscarAluno(nome) {
  try {
    let result = verificarAlunoMatriculado(nome);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

/**
 * Essa funcionalidade irá permitir, cadastrar um aluno em um curso.
 * Essa função só poderá ser executada em um aluno já devidamente cadastrado no sistema, e deverá armazenar
 * a data atual no momento da matricula
 * Lembre-se de exibir o feedback para o usuário.
 *
 * @param {object} aluno
 * @param {string} curso
 */

function matricularAluno(aluno, curso) {
  try {
    verificarAlunoMatriculado(aluno.nome);

    if (curso.length == 0) {
      throw "O nome do curso é inválido";
    }

    alunosDaEscola.forEach(alunoEscola => {
      if (alunoEscola.nome == aluno.nome) {
        let cursoModel = { nomeDoCurso: curso, dataMatricula: new Date() };

        alunoEscola.cursos.push(cursoModel);
      }
    });

    console.log(
      `O ${aluno.nome || "aluno"} foi cadastrado no curso ${curso} com sucesso!`
    );
  } catch (error) {
    console.log(error);
  }
}

/**
 * Ao receber um aluno devidamente cadastrado em nossa lista. Você deverá incrementar uma falta ao aluno. Você deverá dar
 * um feedback ao concluir a tarefa. Só poderá aplicar falta em aluno se o mesmo tiver matriculado em um curso.
 * @param {object} aluno
 */
function aplicarFalta(aluno) {
  try {
    let result = verificarAlunoMatriculado(aluno.nome);

    let studentRegistred = result.some(
      alunoSearch => alunoSearch.cursos.length > 0
    );

    if (studentRegistred) {
      alunosDaEscola.some(alunoEscola => {
        if (alunoEscola.nome == aluno.nome) {
          alunoEscola.faltas += 1;
        }
      });

      console.log(`Falta aplicada com sucesso para o ${aluno.nome || "aluno"}`);
    } else {
      throw `O ${aluno.nome || "aluno"} não está matriculado em nenhum curso.`;
    }
  } catch (error) {
    console.log(error);
  }
}

/**
 *  Ao receber um aluno devidamente cadastrado em nossa lista. Você deverá adicionar uma nota ao aluno na sua lista de notas.
 *  Você deverá dar um feedback ao concluir a tarefa. Só poderá aplicar nota em aluno se o mesmo tiver matriculado em um curso.
 * @param {object} aluno
 */
function aplicarNota(aluno) {
  try {
    let result = verificarAlunoMatriculado(aluno.nome);

    let studentRegistred = result.some(
      alunoSearch => alunoSearch.cursos.length > 0
    );

    if (studentRegistred) {
      alunosDaEscola.some(alunoEscola => {
        if (alunoEscola.nome == aluno.nome) {
          alunoEscola.notas.push(Math.round(Math.random() * (10 - 0) + 0));
        }
      });

      console.log(`Nota registrada com sucesso ao ${aluno.nome || "aluno"}`);
    } else {
      throw `O ${aluno.nome || "aluno"} não está matriculado em nenhum curso.`;
    }
  } catch (error) {
    console.log(error);
  }
}

/**
 * Ao receber um aluno devidamente cadastrado em nossa lista, deverá dizer se o mesmo está aprovado ou não. Os critérios de aprovação
 * são: ter no máximo 3 faltas e média 7 em notas. Só o aluno só poderá ser aprovado se o mesmo tiver matriculado em um curso.
 * @param {object} aluno
 */
function aprovarAluno(aluno) {
  try {
    let result = verificarAlunoMatriculado(aluno.nome);

    let studentRegistred = result.some(
      alunoSearch => alunoSearch.cursos.length > 0
    );

    if (studentRegistred) {
      let AverageNote = result.map(alunoAtual => {
        let noteStudent = alunoAtual.notas.reduce(
          (totalNotes, studentNotes) => totalNotes + studentNotes,
          0
        );

        return (noteStudent / alunoAtual.notas.length).toFixed(2);
      });

      let faults = result.map(alunoAtual => {
        return alunoAtual.faltas;
      });

      if (AverageNote >= 7 && faults <= 3) {
        console.log(
          `O ${aluno.nome ||
            "aluno"} foi aprovado com média ${AverageNote} e com ${faults} faltas.`
        );
      } else {
        console.log(
          `O ${aluno.nome ||
            "aluno"} foi reprovado, média ${AverageNote} e com ${faults} faltas.`
        );
      }
    } else {
      throw `O aluno não está matriculado em nenhum curso!`;
    }
  } catch (error) {
    console.log(error);
  }
}
