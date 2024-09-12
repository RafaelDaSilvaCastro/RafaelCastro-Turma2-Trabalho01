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
    // test('Teste da função de busca de um livro pelo titulo', ()=>{
    //     const livro = {"titulo" :'O pequeno principe', id : 1}
    //     biblioteca.adicionarLivro(livro)

    //     const resultado = biblioteca.buscarLivroPorTitulo('O pequeno principe');
    //     expect(resultado).toContainEqual(livro);
    //     })    

});