import React from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/alurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSidebar(propriedades) {
  // console.log(propriedades);
  return (
    <Box as="aside">
      <img src={`https://github.com/${propriedades.githubUser}.png`} alt="Foto de Perfil" style={{ borderRadius: '8px' }} />
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>
          @{propriedades.githubUser}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function ProfileRelationsBox(propriedades) {
  console.log(propriedades)
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">{propriedades.title} ({propriedades.items.length})</h2>

      <ul>
        {propriedades.items.slice(0,6).map((itemAtual) => {
          return (
            <li key={itemAtual.id}>
              <a href={itemAtual.html_url} target="_blank" rel="noopener noreferrer">
                <img src={itemAtual.avatar_url} />
                <span>{itemAtual.login}</span>
              </a>
            </li>
          ); 
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {
  const githubUser = 'RobsonBnl';
  const usuarioGit = `https://api.github.com/users/${githubUser}/followers`;
  const [comunidades, setComunidades] = React.useState([{
    id: '12802378123789378912789789123896123',
    url: 'https://www.alura.com.br/',
    title: 'Clarinetista Sempre!',
    image: 'https://cdn.pixabay.com/photo/2019/04/10/23/54/clarinet-4118588_960_720.jpg'
  }]);

  // SEGUIDORES
  const [seguidores, setSeguidores] = React.useState([]);
  React.useEffect(function () {
    fetch(usuarioGit)
      .then(function (respostaDoServidor) {
        return respostaDoServidor.json();
      })
      .then(function (respostaCompleta) {
        setSeguidores(respostaCompleta);
      })
  }, [])

  // SEGUINDO
  const [seguindo, setSeguindo] = React.useState([]);
  React.useEffect(function () {
    fetch(usuarioGit)
      .then(function (respostaDoServidor) {
        return respostaDoServidor.json();
      })
      .then(function (respostaCompleta) {
        setSeguindo(respostaCompleta);
      })
  }, [])

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>

        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">Bem vindo(a), Robson!</h1>
            <OrkutNostalgicIconSet />
          </Box>
          {/* <Box>
            <h2 className="subTitle">O que você deseja fazer ?</h2>
            <button>Criar comunidade</button>
            <button>Criar texto</button>
          </Box> */}
          <Box>
            <h2 className="subTitle">O que você deseja fazer ?</h2>
            <form onSubmit={function handleCriaComunidade(e) {
              e.preventDefault();
              const dadosDoForm = new FormData(e.target);

              const comunidade = {
                id: new Date().toISOString(),
                url: dadosDoForm.get('url'),
                title: dadosDoForm.get('title'),
                image: dadosDoForm.get('image')
              }
              const comunidadesAtualizadas = [...comunidades, comunidade]
              setComunidades(comunidadesAtualizadas);
            }}>
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade"
                  type="text"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque a URL da imagem para usarmos de capa"
                  name="image"
                  aria-label="Coloque a URL para usarmos de capa"
                  type="text"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque a URL do site"
                  name="url"
                  aria-label="Coloque a URL do site"
                  type="text"
                />
              </div>
              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>

        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>

          <ProfileRelationsBox title="Seguidores" items={seguidores} />

          <ProfileRelationsBox title="Seguindo" items={seguindo} />

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Comunidades ({comunidades.length})</h2>

            <ul>
              {comunidades.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={itemAtual.url} target="_blank" rel="noopener noreferrer">
                      <img src={itemAtual.image} />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>


        </div>

      </MainGrid>
    </>
  )
};