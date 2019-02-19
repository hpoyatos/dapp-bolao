pragma solidity 0.5.4;


contract Bolao {
    struct Jogador
    {
	    string nome;
      address carteira;
	    uint256 apostas;
	    bool isValue;
    }

    event ApostaEvent(
        address indexed carteira,
        string nome,
        uint256 apostas,
        uint256 apostasTotal,
        uint256 premio
    );

    event FimDeJogoEvent(
        address indexed carteira,
        string ganhador,
        uint256 premio
    );

    event ValorApostaEvent(
        uint256 valorAposta
    );

    mapping(address => Jogador) public jogadoresInfo;
    address private gerente;
    address[] private jogadores;
    address[] private apostas;
    uint256 private premio;
    uint256 private numApostas;
    uint256 private valorAposta;
    address payable private vencedor;

    constructor() public {
        gerente = msg.sender;
        numApostas = 0;
        premio = 0;
        valorAposta = 100000000000000000;
    }

    function entrar(string memory _nome) public payable {
        require(msg.value == valorAposta);
	    if (jogadoresInfo[msg.sender].isValue == false)
	    {
	    	jogadoresInfo[msg.sender] = Jogador({ nome: _nome, carteira: msg.sender, apostas: 1, isValue: true});
	    	jogadores.push(msg.sender);
	    }
	    else
	    {
		    jogadoresInfo[msg.sender].apostas = jogadoresInfo[msg.sender].apostas + 1;
 	    }
	    apostas.push(msg.sender);
        numApostas++;
        premio = premio + msg.value;
	    emit ApostaEvent(msg.sender, jogadoresInfo[msg.sender].nome, jogadoresInfo[msg.sender].apostas, numApostas, address(this).balance);
    }

   function setValorAposta(uint _valorAposta) public restricted {
     valorAposta = _valorAposta;
     emit ValorApostaEvent(valorAposta);
   }

   function escolherGanhador() public restricted {
        uint index = randomico() % apostas.length;
        vencedor = address(uint160(address(apostas[index])));
        vencedor.transfer(address(this).balance);

      if (jogadoresInfo[apostas[index]].isValue == true)
	    {
            emit FimDeJogoEvent(apostas[index], jogadoresInfo[apostas[index]].nome, premio);
	    }
	    limpar();
    }

    modifier restricted() {
        require(msg.sender == gerente);
        _;
    }

    function getJogadores() public view returns (address[] memory) {
        return jogadores;
    }

    function getValorAposta() public view returns (uint256) {
       return valorAposta;
    }

    function getNumAposta() public view returns (uint256) {
       return numApostas;
    }

    function getJogadorPorId(address id) public view returns(string memory nome, address carteira, uint256 apostas){
	    return (jogadoresInfo[id].nome, jogadoresInfo[id].carteira, jogadoresInfo[id].apostas);
    }

    function getGerente() public view returns (address) {
        return gerente;
    }

    function getSaldo() public view returns (uint256){
	return address(this).balance;
    }

    function limpar() private {
        for(uint i=0;i<jogadores.length;i++)
        {
          jogadoresInfo[jogadores[i]].isValue = false;
        }
        jogadores = new address[](0);
        apostas = new address[](0);
        numApostas = 0;
        premio = 0;
    }

    function randomico() private view returns (uint) {
        uint(keccak256(abi.encodePacked(block.difficulty, now, jogadores)));
    }
}
