const Biblioteca = require('../src/Biblioteca')

describe('Testes automatizados da classe BIBLIOTECA', () => {
    let biblioteca
    beforeEach(()=>{
        biblioteca = new Biblioteca([], [])
    })

    //Teste relacionados aos livros da biblioteca
    test('Adicionando livro na biblioteca', ()=>{
        biblioteca.adicionarLivro({"titulo" :'O pequeno principe', id : 1})
        expect(biblioteca.listarLivros().length).toEqual(1)
    })

    test('Removendo livros da biblioteca', ()=>{
        biblioteca.adicionarLivro({"titulo" :'O pequeno principe', id : 1})
        biblioteca.adicionarLivro({"titulo" :'Leviatã', id : 2})
        biblioteca.adicionarLivro({"titulo" :'A ilha do tesouro', id : 3})
        biblioteca.adicionarLivro({"titulo" :'O Deus que Destroi Sonhos', id : 4})
        //Salva quantos livros foram adicionados
        const qtdLivrosAdd = biblioteca.listarLivros().length

        biblioteca.removerLivro(1)
        const qtdLivrosRemovido = biblioteca.listarLivros().length

        expect(qtdLivrosRemovido).toBeLessThan(qtdLivrosAdd)

    }) 

    test('Teste da função de busca de um livro pro ID', ()=>{
        const livro = {"titulo" :'O pequeno principe', id : 1}
        biblioteca.adicionarLivro(livro)
        const resultado = biblioteca.buscarLivroPorId(1)

        expect(biblioteca.listarLivros().length).toEqual(1)
        expect(resultado).toBe(livro)
    })

    test('Deve listar os livros', ()=>{
        expect(biblioteca.listarLivros().length).toBe(0)

        biblioteca.adicionarLivro({"titulo" :'O pequeno principe', id : 1})
        biblioteca.adicionarLivro({"titulo" :'Leviatã', id : 2})
        biblioteca.adicionarLivro({"titulo" :'A ilha do tesouro', id : 3})
        biblioteca.adicionarLivro({"titulo" :'O Deus que Destroi Sonhos', id : 4})
        expect(biblioteca.listarLivros().length).toBe(4)
    })

    test('Busca livros por autor', ()=>{
        biblioteca.adicionarLivro({"titulo" :'O pequeno principe', id : 1, "autor" : "rafael"})
        expect(biblioteca.listarLivrosPorAutor('Rafael Castro').length).toEqual(0)

        expect(biblioteca.listarLivrosPorAutor('rafael').length).toEqual(1)
    })

    test('Buscan livros de um autor que não existe', ()=>{
        biblioteca.adicionarLivro({"titulo" :'O pequeno principe', id : 1, "autor" : "rafael"})
        expect(biblioteca.listarLivrosPorAutor('Rafael Castro').length).toBe(0)
    })

    test('Busca livro por genero', ()=>{
        biblioteca.adicionarLivro({"titulo" :'O pequeno principe', id : 1, "autor" : "rafael", "genero" : "aventura"})
        expect(biblioteca.listarLivrosPorGenero('aventura').length).toBe(1)
    })

    test('Busca livro por genero não cadastrado', ()=>{
        expect(biblioteca.listarLivrosPorGenero('aventura2').length).toBe(0)
    })

    test('Busca livros pelo ano', ()=>{
        biblioteca.adicionarLivro({"titulo" :'O pequeno principe', id : 1, "autor" : "rafael", "genero" : "aventura", "ano" : 2000})        
        expect(biblioteca.listarLivrosPorAno(2000).length).toBe(1)
    })

    test('Busca livros pro um ano não cadastrado', ()=>{
        expect(biblioteca.listarLivrosPorAno(2400).length).toBe(0)
    })

    test('Altera dados do livro', ()=>{
        biblioteca.adicionarLivro({"titulo" :'O pequeno principe', id : 1, "autor" : "rafael", "genero" : "aventura", "ano" : 2000})        

        expect(biblioteca.listarLivrosPorAno(2500).length).toBe(0)
        biblioteca.atualizarInformacaoLivro(1, {"titulo" :'O pequeno principe', id : 1, "autor" : "rafael", "genero" : "aventura", "ano" : 2500})
        expect(biblioteca.listarLivrosPorAno(2500).length).toBe(1)
        
    })

    //Teste relacionado aos menbros da biblioteca
    test('Deve adicionar um novo menbro', ()=>{
        biblioteca.adicionarMembro({"id" : 1})
        expect(biblioteca.listarMembros().length).toBe(1)
    })

    test('Removendo menbro da biblioteca', ()=>{
        biblioteca.adicionarMembro({"id" : 1})
        biblioteca.adicionarMembro({"id" : 2})
        biblioteca.adicionarMembro({"id" : 3})
        //Salva quantos foram adicionados
        const qtdAdicionado = biblioteca.listarMembros().length

        biblioteca.removerMembro(3)
        expect(biblioteca.listarMembros().length).toBeLessThan(qtdAdicionado)

    })

    test('Busca o menbro por ID', ()=>{
        const menbro = {"id" : 1}
        biblioteca.adicionarMembro(menbro)

        const resultado = biblioteca.buscarMembroPorId(1)
        expect(resultado).toBe(menbro)
    })

    test('Lista os menbros contidos', ()=>{
        biblioteca.adicionarMembro({"id" : 1})
        biblioteca.adicionarMembro({"id" : 2})
        biblioteca.adicionarMembro({"id" : 3}) 
        const qtdAdd1 = biblioteca.listarMembros().length
        expect(biblioteca.listarMembros().length).toBe(3)

        biblioteca.adicionarMembro({"id" : 4})
        biblioteca.adicionarMembro({"id" : 5}) 

        biblioteca.removerMembro(1)

        const qtdAdd2 = biblioteca.listarMembros().length
        expect(biblioteca.listarMembros().length).toBe(4)
    })
  
    //Teste relacionados a emprestar Livros para Menbros
    test('Emprestando um livro da biblioteca para um menbro', ()=>{
        biblioteca.adicionarLivro({"titulo" :'O pequeno principe', id : 1, "emprestado" : false})
        biblioteca.adicionarMembro({"id" : 1})

        expect(biblioteca.emprestarLivro(1,1)).toBe(true)
    })

    test('Emprestando um livro que não exite na biblioteca para um menbro', ()=>{
        biblioteca.adicionarLivro({"titulo" :'O pequeno principe', id : 1, "emprestado" : false})
        biblioteca.adicionarMembro({"id" : 1})

        expect(biblioteca.emprestarLivro(2,1)).toBe(false)
    })

    test('Emprestando um livro da biblioteca para um não menbro', ()=>{
        biblioteca.adicionarLivro({"titulo" :'O pequeno principe', id : 1, "emprestado" : false})
        biblioteca.adicionarMembro({"id" : 1})

        expect(biblioteca.emprestarLivro(2,1055)).toBe(false)
    })    

    test('Verifica os livros emprestados', ()=>{
        biblioteca.adicionarLivro({"titulo" :'O pequeno principe', id : 1, "emprestado" : false})
        biblioteca.adicionarLivro({"titulo" :'O grande principe', id : 2, "emprestado" : false})
        biblioteca.adicionarMembro({"id" : 1})

        biblioteca.emprestarLivro(1,1)
        expect(biblioteca.listarLivrosEmprestados().length).toBe(1)

        biblioteca.emprestarLivro(2,1)  
        expect(biblioteca.listarLivrosEmprestados().length).toBe(2)

    })

    test('Verifica livros disponiveis', ()=>{
        biblioteca.adicionarLivro({"titulo" :'O pequeno principe', id : 1, "emprestado" : false})
        biblioteca.adicionarLivro({"titulo" :'O grande principe', id : 2, "emprestado" : false})
        biblioteca.adicionarMembro({"id" : 1})

        biblioteca.emprestarLivro(1,1)
        expect(biblioteca.listarLivrosDisponiveis().length).toBe(1)
    })

    //Teste sobre devolver livro
    test('Devolvendo livro', ()=>{
        biblioteca.adicionarLivro({"titulo" :'O pequeno principe', id : 1, "emprestado" : false})
        biblioteca.adicionarLivro({"titulo" :'O grande principe', id : 2, "emprestado" : false})
        biblioteca.adicionarMembro({"id" : 1})

        biblioteca.emprestarLivro(1,1)
        biblioteca.devolverLivro(1)
        expect(biblioteca.listarLivrosDisponiveis().length).toBe(2) 
    })

});