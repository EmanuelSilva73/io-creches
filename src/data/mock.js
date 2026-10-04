// Dados fictícios usados enquanto não há backend.
// Os nomes das coleções e campos já seguem o formato esperado da futura API.

export const turmas = [
  {
    id: 1,
    nome: 'Berçário I - A',
    faixaEtaria: 'Berçário I',
    turno: 'Integral',
    capacidade: 12,
    educadora: 'Ana Paula Ferreira',
    sala: 'Sala 01',
  },
  {
    id: 2,
    nome: 'Berçário II - A',
    faixaEtaria: 'Berçário II',
    turno: 'Integral',
    capacidade: 15,
    educadora: 'Juliana Costa',
    sala: 'Sala 02',
  },
  {
    id: 3,
    nome: 'Maternal I - A',
    faixaEtaria: 'Maternal I',
    turno: 'Manhã',
    capacidade: 20,
    educadora: 'Márcia Albuquerque',
    sala: 'Sala 03',
  },
  {
    id: 4,
    nome: 'Maternal II - B',
    faixaEtaria: 'Maternal II',
    turno: 'Tarde',
    capacidade: 20,
    educadora: 'Fernanda Lima',
    sala: 'Sala 04',
  },
]

export const responsaveis = [
  {
    id: 1,
    nome: 'Maria José da Silva',
    cpf: '123.456.789-00',
    parentesco: 'Mãe',
    telefone: '(81) 99876-5432',
    email: 'maria.silva@email.com',
  },
  {
    id: 2,
    nome: 'João Batista Souza',
    cpf: '987.654.321-00',
    parentesco: 'Pai',
    telefone: '(81) 98765-1234',
    email: 'joao.souza@email.com',
  },
  {
    id: 3,
    nome: 'Antônia Gonçalves',
    cpf: '456.789.123-00',
    parentesco: 'Avó',
    telefone: '(81) 99654-7788',
    email: '',
  },
  {
    id: 4,
    nome: 'Cláudia Ribeiro',
    cpf: '321.654.987-00',
    parentesco: 'Mãe',
    telefone: '(81) 98123-4567',
    email: 'claudia.ribeiro@email.com',
  },
]

export const criancas = [
  {
    id: 1,
    nome: 'Helena da Silva',
    dataNascimento: '2025-03-14',
    sexo: 'F',
    turmaId: 1,
    responsavelId: 1,
    alergias: 'Lactose',
    observacoes: '',
    ativo: true,
  },
  {
    id: 2,
    nome: 'Miguel Souza',
    dataNascimento: '2024-08-02',
    sexo: 'M',
    turmaId: 2,
    responsavelId: 2,
    alergias: '',
    observacoes: 'Usa óculos',
    ativo: true,
  },
  {
    id: 3,
    nome: 'Arthur Gonçalves',
    dataNascimento: '2023-11-20',
    sexo: 'M',
    turmaId: 3,
    responsavelId: 3,
    alergias: 'Amendoim',
    observacoes: '',
    ativo: true,
  },
  {
    id: 4,
    nome: 'Alice Ribeiro',
    dataNascimento: '2022-06-09',
    sexo: 'F',
    turmaId: 4,
    responsavelId: 4,
    alergias: '',
    observacoes: '',
    ativo: true,
  },
  {
    id: 5,
    nome: 'Laura Ribeiro',
    dataNascimento: '2023-09-30',
    sexo: 'F',
    turmaId: 3,
    responsavelId: 4,
    alergias: '',
    observacoes: 'Irmã de Alice Ribeiro',
    ativo: true,
  },
]

export const matriculas = [
  {
    id: 1,
    criancaId: 1,
    turmaId: 1,
    anoLetivo: 2026,
    dataMatricula: '2026-01-15',
    situacao: 'Ativa',
  },
  {
    id: 2,
    criancaId: 2,
    turmaId: 2,
    anoLetivo: 2026,
    dataMatricula: '2026-01-16',
    situacao: 'Ativa',
  },
  {
    id: 3,
    criancaId: 3,
    turmaId: 3,
    anoLetivo: 2026,
    dataMatricula: '2026-01-20',
    situacao: 'Ativa',
  },
  {
    id: 4,
    criancaId: 4,
    turmaId: 4,
    anoLetivo: 2026,
    dataMatricula: '2026-02-02',
    situacao: 'Ativa',
  },
  {
    id: 5,
    criancaId: 5,
    turmaId: 3,
    anoLetivo: 2026,
    dataMatricula: '2026-09-28',
    situacao: 'Pendente',
  },
]

// Registros de presença: um por criança, turma e data
export const frequencias = []

export default { turmas, responsaveis, criancas, matriculas, frequencias }
