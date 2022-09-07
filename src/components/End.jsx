import '../Styles/End.css'

const End = ({ retry, score }) => {
    return (
        <div>
        <h1>Fim do Jogo!</h1>
        <h2>Seus pontos: <span>{score}</span></h2>
        <button onClick={ retry }>Reiniciar!</button>
        </div>
    )
}

export default End;
