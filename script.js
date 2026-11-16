/* =========================================================
   Árvore dos SOs
   NODES é a fonte única dos dados: a árvore, a linha do tempo,
   os cards das famílias e o painel de detalhes são gerados a partir dele.
   - parents[0] é o "pai" usado para desenhar a árvore;
     pais extras (ex.: XNU ← BSD) viram uma linha tracejada.
   ========================================================= */

const FAMILIES = {
  microsoft: 'Microsoft',
  unix: 'UNIX',
  bsd: 'BSD',
  apple: 'Apple',
  linux: 'Linux',
};

const NODES = [
  // ---------- Linhagem MS-DOS (Microsoft) ----------
  {
    id: 'msdos', name: 'MS-DOS', year: 1981, type: 'so', family: 'microsoft', parents: [],
    desc: 'Em 1980, a IBM ia lançar seu primeiro computador pessoal e precisava de um sistema para ele. A Microsoft comprou um sistema pronto, o 86-DOS, de outra empresa, e o adaptou. A IBM vendeu esse sistema como PC DOS, e a Microsoft vendeu a mesma base, com o nome MS-DOS, para outros fabricantes. Tudo era feito digitando comandos numa tela preta, depois do famoso C:\\>, e só um programa rodava por vez. É o ponto de partida de toda a família Windows.',
  },
  {
    id: 'win3x', name: 'Windows 3.x', year: 1990, type: 'so', family: 'microsoft', parents: ['msdos'],
    desc: 'Antes dele vieram o Windows 1.0 (1985) e o 2.0 (1987), que fizeram pouco sucesso. O Windows 3.0 (1990) e o 3.1 (1992) foram os primeiros a fazer sucesso de verdade, trazendo janelas, ícones e mouse para os PCs. Mas ainda não era um sistema completo: era uma interface gráfica que funcionava em cima do MS-DOS.',
  },
  {
    id: 'win9x', name: 'Windows 9.x Kernel', year: 1995, type: 'kernel', family: 'microsoft', parents: ['win3x'],
    desc: 'Foi criado para o Windows 95. A Microsoft queria um sistema mais moderno (de 32 bits, que usa melhor a memória) que ainda rodasse os programas antigos do MS-DOS e do Windows 3.x. Para isso, misturou código antigo e novo e manteve o MS-DOS na inicialização. O resultado travava com mais facilidade. Foi usado no Windows 95, no 98 e, por último, no Windows ME (2000).',
  },
  {
    id: 'win95', name: 'Windows 95', year: 1995, type: 'so', family: 'microsoft', parents: ['win9x'],
    desc: 'Lançado em 24 de agosto de 1995, foi o primeiro sistema com o kernel 9.x. Pela primeira vez, o MS-DOS e o Windows vinham juntos num produto só: bastava ligar o PC. Trouxe o Menu Iniciar, a barra de tarefas e o Windows Explorer, que existem até hoje.',
  },
  {
    id: 'win98', name: 'Windows 98', year: 1998, type: 'so', family: 'microsoft', parents: ['win95'],
    desc: 'Lançado em 25 de junho de 1998 como uma melhoria do Windows 95. Funcionava melhor com aparelhos USB, aceitava discos maiores (FAT32) e já vinha com o navegador Internet Explorer. Ganhou uma Segunda Edição em 1999. Depois dele, só o Windows ME (2000) ainda usou o kernel 9.x.',
  },
  {
    id: 'winnt', name: 'Windows NT Kernel', year: 1993, type: 'kernel', family: 'microsoft', parents: ['win9x'],
    desc: 'Em 1988, a Microsoft contratou Dave Cutler, um engenheiro experiente, para criar um kernel novo do zero: mais estável, mais seguro e sem depender do MS-DOS. No começo, ele seria a nova versão do OS/2, um sistema que a Microsoft fazia com a IBM. Mas o Windows 3.0 fez tanto sucesso que o projeto virou Windows. Estreou em 1993 no Windows NT 3.1, feito para empresas. Ele aparece depois do 9.x na árvore porque, a partir do Windows XP, substituiu o 9.x também nos PCs de casa. Todo Windows desde então usa o NT.',
  },
  {
    id: 'winxp', name: 'Windows XP', year: 2001, type: 'so', family: 'microsoft', parents: ['winnt'],
    desc: 'Lançado em 25 de outubro de 2001. Até então, a Microsoft tinha duas linhas de Windows: uma para casa (95, 98 e ME) e outra para empresas (NT e 2000). O XP juntou as duas: foi feito a partir do Windows 2000 e levou o kernel NT, mais estável, para os PCs de casa. Com o visual azul e verde "Luna", foi um dos Windows mais usados e duradouros.',
  },
  {
    id: 'vista', name: 'Windows Vista', year: 2007, type: 'so', family: 'microsoft', parents: ['winxp'],
    desc: 'Nasceu de um projeto chamado "Longhorn", que atrasou tanto que a Microsoft recomeçou boa parte do trabalho em 2004. Chegou ao público em janeiro de 2007, com o visual transparente Aero e o Controle de Conta de Usuário (UAC), a janela que pede confirmação antes de mudanças importantes. Era pesado para os PCs da época e foi mal recebido.',
  },
  {
    id: 'win7', name: 'Windows 7', year: 2009, type: 'so', family: 'microsoft', parents: ['vista'],
    desc: 'Surgiu como resposta às críticas ao Vista. A Microsoft manteve a mesma base e focou em deixá-lo mais leve, rápido e estável, com uma barra de tarefas nova. Lançado em 22 de outubro de 2009, em cerca de dois anos passou o XP e virou o Windows mais usado do mundo.',
  },
  {
    id: 'win8', name: 'Windows 8', year: 2012, type: 'so', family: 'microsoft', parents: ['win7'],
    desc: 'Nasceu da tentativa de ter um único Windows para computadores e tablets, na época em que o iPad e os smartphones cresciam. Lançado em 26 de outubro de 2012, trouxe uma tela inicial de blocos, pensada para o toque, e tirou o Menu Iniciar. Muita gente não gostou, e o botão Iniciar voltou no Windows 8.1 (2013).',
  },
  {
    id: 'win10', name: 'Windows 10', year: 2015, type: 'so', family: 'microsoft', parents: ['win8'],
    desc: 'Criado para corrigir a rejeição ao Windows 8 e ter um sistema só para PCs, tablets, celulares e o videogame Xbox. A Microsoft pulou o número 9. Lançado em 29 de julho de 2015, trouxe de volta o Menu Iniciar, estreou o navegador Edge e passou a receber atualizações o tempo todo, em vez de uma versão nova a cada poucos anos. O suporte oficial terminou em 14 de outubro de 2025.',
  },
  {
    id: 'win11', name: 'Windows 11', year: 2021, type: 'so', family: 'microsoft', parents: ['win10'],
    desc: 'Foi feito a partir do Windows 10 e aproveitou ideias do Windows 10X, um projeto para aparelhos com duas telas que foi cancelado. Lançado em 5 de outubro de 2021, trouxe visual novo, Menu Iniciar no centro da tela e exigências maiores de hardware, como o chip de segurança TPM 2.0.',
  },

  // ---------- Linhagem UNIX ----------
  {
    id: 'unix', name: 'UNIX', year: 1969, type: 'kernel', family: 'unix', parents: [],
    desc: 'No fim dos anos 1960, os Laboratórios Bell (da empresa AT&T) desistiram de participar do Multics, um sistema grande e complicado. Dois pesquisadores de lá, Ken Thompson e Dennis Ritchie, resolveram criar algo bem mais simples. Em 1973, reescreveram o UNIX na linguagem C, criada pelo próprio Ritchie. Isso permitiu levar o sistema para outros computadores, algo raro na época. Ideias do UNIX, como guardar tudo em pastas a partir de uma raiz e juntar programas pequenos para fazer tarefas grandes, estão em quase todos os sistemas de hoje.',
  },
  {
    id: 'mach', name: 'Mach Kernel', year: 1985, type: 'kernel', family: 'apple', parents: ['unix'],
    desc: 'Criado em 1985 na Universidade Carnegie Mellon (EUA). Os pesquisadores queriam um kernel moderno, pensado para computadores com vários processadores e capaz de rodar programas do UNIX. Ele é um microkernel: deixa no núcleo só o essencial (memória, processos e comunicação) e roda o resto como programas separados. Foi usado pela NeXT, empresa de Steve Jobs, no sistema NeXTSTEP.',
  },
  {
    id: 'bsd', name: 'BSD Kernel', year: 1978, type: 'kernel', family: 'bsd', parents: ['unix'],
    desc: 'Em 1974, a Universidade da Califórnia em Berkeley recebeu uma cópia do UNIX. Alunos e professores, com destaque para Bill Joy, começaram a melhorá-lo e, a partir de 1978, a distribuir essas melhorias com o nome Berkeley Software Distribution (BSD). A versão de 1983 trouxe o TCP/IP, a "língua" que os computadores usam para conversar na internet, e ajudou a internet a crescer.',
  },
  {
    id: 'linux', name: 'Linux Kernel', year: 1991, type: 'kernel', family: 'linux', parents: ['unix'],
    desc: 'Em 25 de agosto de 1991, Linus Torvalds, um estudante finlandês de 21 anos, anunciou que estava criando um kernel "só como hobby". Ele usava o MINIX, um sistema parecido com o UNIX feito para ensinar, e quis um kernel próprio para o seu PC. O Linux não usa código do UNIX, mas funciona do mesmo jeito (por isso é chamado de "Unix-like"). Desde 1992 é software livre: qualquer pessoa pode usar, estudar, alterar e distribuir. Hoje roda em servidores, celulares, supercomputadores e roteadores.',
  },
  {
    id: 'xnu', name: 'XNU Kernel', year: 1996, type: 'kernel', family: 'apple', parents: ['mach', 'bsd'], badge: 'Mach + BSD',
    desc: 'O nome vem de "X is Not Unix" ("X não é Unix"). Surgiu na NeXT, a empresa de Steve Jobs, que juntou o Mach e o BSD num só kernel. Quando a Apple comprou a NeXT, no fim de 1996, levou esse kernel junto e o modernizou. É um kernel híbrido: o Mach cuida da memória e dos processos, e o BSD traz a rede, os arquivos e as permissões no estilo UNIX.',
  },
  {
    id: 'darwin', name: 'Darwin OS', year: 2000, type: 'so', family: 'apple', parents: ['xnu'],
    desc: 'Quando criou o Mac OS X, a Apple separou a base do sistema (o kernel XNU e as ferramentas do UNIX) e a publicou como código aberto, ou seja, qualquer pessoa pode ver e estudar o código. Essa base se chama Darwin e está por baixo de todos os sistemas da Apple: Mac, iPhone, iPad e Apple Watch.',
  },
  {
    id: 'macos', name: 'macOS / OS X', year: 2001, type: 'so', family: 'apple', parents: ['darwin'],
    desc: 'Nos anos 1990, a Apple tentou criar um sistema novo (o projeto Copland) e não conseguiu. A solução foi comprar a NeXT, de Steve Jobs, e usar o sistema dela como base. Assim nasceu o Mac OS X 10.0 (2001): o Darwin por baixo e a interface Aqua por cima. Mudou de nome para OS X em 2012 e para macOS em 2016. Desde 2007, é um UNIX com certificado oficial.',
  },
  {
    id: 'ios', name: 'iOS', year: 2007, type: 'so', family: 'apple', parents: ['darwin'],
    desc: 'Lançado junto com o primeiro iPhone, em 2007, com o nome "iPhone OS" (virou iOS em 2010). Em vez de criar um sistema do zero, a Apple adaptou a mesma base do Mac (Darwin e XNU) para celulares com tela de toque.',
  },
  {
    id: 'freebsd', name: 'FreeBSD', year: 1993, type: 'so', family: 'bsd', parents: ['bsd'],
    desc: 'Começou em 1993, quando um grupo que mantinha correções para o 386BSD (uma versão do BSD para PCs comuns) decidiu lançar um sistema próprio. É descendente direto do BSD e famoso pelo desempenho e pela estabilidade, principalmente em servidores. Como sua licença permite usar o código em produtos fechados, ele está até no sistema dos videogames PlayStation 4 e 5.',
  },
  {
    id: 'openbsd', name: 'OpenBSD', year: 1995, type: 'so', family: 'bsd', parents: ['bsd'],
    desc: 'Nasceu em 1995, quando Theo de Raadt saiu do NetBSD (outro sistema descendente do BSD) e criou o próprio projeto. O foco é segurança: o código é revisado o tempo todo em busca de falhas. Dele saiu o OpenSSH (1999), programa de acesso remoto seguro usado no mundo inteiro.',
  },
  {
    id: 'android', name: 'Android', year: 2008, type: 'so', family: 'linux', parents: ['linux'],
    desc: 'Começou na Android Inc., uma pequena empresa criada em 2003 e comprada pelo Google em 2005. Em 2007, o Google o apresentou junto com um grupo de empresas de celulares (a Open Handset Alliance), e a versão 1.0 saiu em setembro de 2008. Usa o kernel Linux por baixo e hoje é o sistema mais usado do mundo em número de aparelhos.',
  },
  {
    id: 'debian', name: 'Debian', year: 1993, type: 'so', family: 'linux', parents: ['linux'],
    desc: 'Começou em agosto de 1993, criado por Ian Murdock. A ideia era montar um sistema completo, juntando o kernel Linux com programas livres, feito de forma aberta por uma comunidade. Um sistema montado assim se chama "distribuição Linux". O nome junta Debra, então namorada dele, e Ian. É famoso pela estabilidade e pelo APT, que instala programas com um único comando, e serve de base para dezenas de outras distribuições.',
  },
  {
    id: 'ubuntu', name: 'Ubuntu', year: 2004, type: 'so', family: 'linux', parents: ['debian'],
    desc: 'Criado pela empresa Canonical, de Mark Shuttleworth, e lançado em 20 de outubro de 2004 a partir do Debian. O objetivo era um Linux fácil e gratuito para qualquer pessoa, com versão nova a cada seis meses. "Ubuntu" é uma palavra africana que significa "humanidade para com os outros". Virou uma das distribuições mais usadas em computadores pessoais e na nuvem.',
  },
  {
    id: 'mint', name: 'Linux Mint', year: 2006, type: 'so', family: 'linux', parents: ['ubuntu'],
    desc: 'Criado em 2006 por Clement Lefebvre, um francês que escrevia sobre Linux. Foi feito a partir do Ubuntu e pensado para quem vem do Windows: visual parecido e programas prontos para usar (como os que tocam vídeos e músicas) logo depois de instalar.',
  },
];

/* =========================================================
   Fichas técnicas
   Para cada id de NODES: características (specs) e referências oficiais (refs).
   Os dados são mesclados em NODES logo abaixo.
   ========================================================= */

const sim = (note = '') => ({ value: 'sim', note });
const nao = (note = '') => ({ value: 'nao', note });
const parcial = (note = '') => ({ value: 'parcial', note });

const KERNEL = {
  mono: 'Monolítico',
  hibrido: 'Híbrido (misto)',
  micro: 'Microkernel',
};

const REF = {
  ritchie: { label: 'Dennis Ritchie (Bell Labs): The Evolution of the Unix Time-sharing System', url: 'https://www.nokia.com/bell-labs/about/dennis-m-ritchie/hist.html' },
  unixOrg: { label: 'The Open Group: unix.org', url: 'https://unix.org/' },
  freebsdIntro: { label: 'FreeBSD Handbook: introdução e história do BSD', url: 'https://docs.freebsd.org/en/books/handbook/introduction/' },
  design44: { label: 'The Design and Implementation of the 4.4BSD Operating System', url: 'https://docs.freebsd.org/en/books/design-44bsd/' },
  freebsd30: { label: 'FreeBSD 3.0: notas da versão (incorporação do SMP)', url: 'https://www.freebsd.org/releases/3.0R/notes/' },
  freebsdKernel: { label: 'FreeBSD Handbook: configurando o kernel (kernel monolítico e módulos)', url: 'https://docs.freebsd.org/en/books/handbook/kernelconfig/' },
  freebsdZfs: { label: 'FreeBSD Handbook: ZFS', url: 'https://docs.freebsd.org/en/books/handbook/zfs/' },
  freebsdNet: { label: 'FreeBSD Handbook: servidores de rede (NFS, Samba)', url: 'https://docs.freebsd.org/en/books/handbook/network-servers/' },
  openbsdFaq: { label: 'OpenBSD FAQ', url: 'https://www.openbsd.org/faq/' },
  openbsdDisk: { label: 'OpenBSD FAQ: discos e sistemas de arquivos', url: 'https://www.openbsd.org/faq/faq14.html' },
  openbsd36: { label: 'OpenBSD 3.6: notas da versão (suporte a SMP)', url: 'https://www.openbsd.org/36.html' },
  mach: { label: 'Carnegie Mellon University: Overview of the Mach project', url: 'https://www.cs.cmu.edu/afs/cs/project/mach/public/www/overview.html' },
  appleKernel: { label: 'Apple: Kernel Programming Guide, Kernel Architecture Overview', url: 'https://developer.apple.com/library/archive/documentation/Darwin/Conceptual/KernelProgramming/Architecture/Architecture.html' },
  appleMach: { label: 'Apple: Kernel Programming Guide, Mach Overview', url: 'https://developer.apple.com/library/archive/documentation/Darwin/Conceptual/KernelProgramming/Mach/Mach.html' },
  xnuSource: { label: 'Apple: código-fonte do XNU (GitHub oficial)', url: 'https://github.com/apple-oss-distributions/xnu' },
  xnuNfs: { label: 'Apple: código do NFS no XNU (GitHub oficial)', url: 'https://github.com/apple-oss-distributions/xnu/tree/main/bsd/nfs' },
  smbClient: { label: 'Apple: código do cliente SMB (GitHub oficial)', url: 'https://github.com/apple-oss-distributions/SMBClient' },
  appleOss: { label: 'Apple Open Source', url: 'https://opensource.apple.com/' },
  apfs: { label: 'Apple Developer: About Apple File System', url: 'https://developer.apple.com/documentation/foundation/file_system/about_apple_file_system' },
  macSharing: { label: 'Suporte Apple: configurar o compartilhamento de arquivos no Mac', url: 'https://support.apple.com/pt-br/guide/mac-help/mh17131/mac' },
  macRemoteLogin: { label: 'Suporte Apple: Login Remoto (SSH) no Mac', url: 'https://support.apple.com/pt-br/guide/mac-help/mchlp1066/mac' },
  appleSecurity: { label: 'Apple: Segurança das plataformas Apple', url: 'https://support.apple.com/pt-br/guide/security/welcome/web' },
  iphoneFiles: { label: 'Suporte Apple: conectar o iPhone a um servidor de arquivos', url: 'https://support.apple.com/pt-br/guide/iphone/iph1fdf33c74/ios' },
  kernelReadme: { label: 'Linux Kernel: o que é o Linux (README)', url: 'https://docs.kernel.org/admin-guide/README.html' },
  kernelModules: { label: 'Linux Kernel: módulos do kernel', url: 'https://docs.kernel.org/kbuild/modules.html' },
  kernelFs: { label: 'Linux Kernel: sistemas de arquivos', url: 'https://docs.kernel.org/filesystems/index.html' },
  kernelNfs: { label: 'Linux Kernel: NFS', url: 'https://docs.kernel.org/filesystems/nfs/index.html' },
  androidAbout: { label: 'Android Open Source Project: sobre o Android (Open Handset Alliance)', url: 'https://source.android.com/docs/setup/about' },
  androidKernel: { label: 'Android Open Source Project: kernel', url: 'https://source.android.com/docs/core/architecture/kernel' },
  androidStorage: { label: 'Android Open Source Project: armazenamento', url: 'https://source.android.com/docs/core/storage' },
  androidUsers: { label: 'Android Open Source Project: suporte a vários usuários', url: 'https://source.android.com/docs/devices/admin/multi-user' },
  quickShare: { label: 'Ajuda do Android: usar o Quick Share', url: 'https://support.google.com/android/answer/9286773?hl=pt-BR' },
  debianAbout: { label: 'Debian: sobre o Debian', url: 'https://www.debian.org/intro/about' },
  debianInstall: { label: 'Debian: guia de instalação (particionamento e sistemas de arquivos)', url: 'https://www.debian.org/releases/stable/amd64/apcs02.pt.html' },
  debianSamba: { label: 'Debian Wiki: Samba', url: 'https://wiki.debian.org/Samba' },
  debianNfs: { label: 'Debian Wiki: servidor NFS', url: 'https://wiki.debian.org/NFSServerSetup' },
  ubuntuAbout: { label: 'Ubuntu: sobre o Ubuntu', url: 'https://ubuntu.com/about' },
  ubuntuSamba: { label: 'Ubuntu Server docs: servidor de arquivos Samba', url: 'https://documentation.ubuntu.com/server/how-to/samba/file-server/' },
  mintAbout: { label: 'Linux Mint: sobre', url: 'https://linuxmint.com/about.php' },
  mintGuide: { label: 'Linux Mint: guia do usuário', url: 'https://linuxmint-user-guide.readthedocs.io/en/latest/' },
  warpinator: { label: 'Linux Mint: Warpinator (GitHub oficial)', url: 'https://github.com/linuxmint/warpinator' },
  msdosSource: { label: 'Microsoft: código-fonte do MS-DOS (GitHub oficial)', url: 'https://github.com/microsoft/MS-DOS' },
  fat: { label: 'Microsoft Learn: sistemas de arquivos FAT, HPFS e NTFS', url: 'https://learn.microsoft.com/pt-br/troubleshoot/windows-client/backup-and-storage/fat-hpfs-and-ntfs-file-systems' },
  winComponents: { label: 'Microsoft Learn: visão geral dos componentes do Windows (kernel)', url: 'https://learn.microsoft.com/pt-br/windows-hardware/drivers/kernel/overview-of-windows-components' },
  kernelMode: { label: 'Microsoft Learn: modo usuário e modo kernel', url: 'https://learn.microsoft.com/pt-br/windows-hardware/drivers/gettingstarted/user-mode-and-kernel-mode' },
  ntfs: { label: 'Microsoft Learn: visão geral do NTFS', url: 'https://learn.microsoft.com/pt-br/windows-server/storage/file-server/ntfs-overview' },
  smb: { label: 'Microsoft Learn: visão geral do protocolo SMB', url: 'https://learn.microsoft.com/pt-br/windows-server/storage/file-server/file-server-smb-overview' },
  smbVersions: { label: 'Microsoft Learn: versões do SMB (SMBv1, v2 e v3)', url: 'https://learn.microsoft.com/pt-br/windows-server/storage/file-server/troubleshoot/detect-enable-and-disable-smbv1-v2-v3' },
  multiProc: { label: 'Microsoft Learn: vários processadores', url: 'https://learn.microsoft.com/pt-br/windows/win32/procthread/multiple-processors' },
  rds: { label: 'Microsoft Learn: Serviços de Área de Trabalho Remota (várias sessões no Windows Server)', url: 'https://learn.microsoft.com/pt-br/windows-server/remote/remote-desktop-services/remote-desktop-services-overview' },
  multiSession: { label: 'Microsoft Learn: Windows Enterprise multissessão (Azure Virtual Desktop)', url: 'https://learn.microsoft.com/pt-br/azure/virtual-desktop/windows-multisession-faq' },
  win11Req: { label: 'Microsoft Learn: requisitos do Windows 11', url: 'https://learn.microsoft.com/pt-br/windows/whats-new/windows-11-requirements' },
  winSharing: { label: 'Suporte Microsoft: compartilhamento de arquivos em uma rede no Windows', url: 'https://support.microsoft.com/pt-br/windows/compartilhamento-de-arquivos-em-uma-rede-no-windows-b58704b2-f53a-4b82-7bc1-80f9994725bf' },
  // A Microsoft não mantém páginas oficiais dessas versões antigas
  wikiWin3: { label: 'Wikipédia: Windows 3.x (sem página oficial)', url: 'https://pt.wikipedia.org/wiki/Windows_3.x' },
  wikiWin9x: { label: 'Wikipédia: Windows 9x (sem página oficial)', url: 'https://pt.wikipedia.org/wiki/Windows_9x' },
  wikiWin95: { label: 'Wikipédia: Windows 95 (sem página oficial)', url: 'https://pt.wikipedia.org/wiki/Windows_95' },
  wikiWin98: { label: 'Wikipédia: Windows 98 (sem página oficial)', url: 'https://pt.wikipedia.org/wiki/Windows_98' },
};

const lifecycle = (slug, name) => ({
  label: `Microsoft Learn: ciclo de vida do ${name}`,
  url: `https://learn.microsoft.com/pt-br/lifecycle/products/${slug}`,
});

// Características repetidas em toda a família Windows NT (XP → 11)
const NT_MULTIUSER = nao('Dá para criar várias contas, mas só uma pessoa usa o computador por vez. Se alguém entrar à distância (Área de Trabalho Remota), quem estava no PC é desconectado. Para várias pessoas ao mesmo tempo, a Microsoft vende o Windows Server.');
const NT_MULTIUSER_ENTERPRISE = nao('Dá para criar várias contas, mas só uma pessoa usa o computador por vez. Para várias pessoas ao mesmo tempo, a Microsoft vende o Windows Server. A única exceção é uma edição para empresas que roda na nuvem da Microsoft.');
const NT_MULTIPROC = sim('Vem do kernel NT: divide o trabalho entre todos os processadores e núcleos do computador.');
const NT_KERNEL = { value: KERNEL.hibrido, note: 'Usa o kernel NT, que é híbrido.' };
const LINUX_KERNEL = { value: KERNEL.mono, note: 'Usa o kernel Linux: monolítico, mas que aceita encaixar e retirar peças (módulos) com o sistema ligado.' };
const XNU_KERNEL = { value: KERNEL.hibrido, note: 'Usa o kernel XNU, que junta o Mach e o BSD.' };

const FICHAS = {
  // ---------- Linhagem UNIX ----------
  unix: {
    specs: {
      multiuser: sim('Foi feito para várias pessoas usarem o mesmo computador ao mesmo tempo, cada uma no seu terminal (tela e teclado ligados à máquina).'),
      multiproc: nao('Os computadores da época tinham um só processador. O suporte a vários veio em versões posteriores.'),
      kernel: { value: KERNEL.mono, note: 'Todo o núcleo funciona como um único programa.' },
      fs: 'O sistema de arquivos do UNIX: todas as pastas ficam numa única árvore que começa na raiz, escrita como "/". Essa ideia é usada até hoje no Linux e no macOS.',
      sharing: 'No mesmo computador, cada arquivo tem permissões que dizem quem pode ler, alterar ou executar: o dono, o grupo dele ou todo mundo. Entre computadores, usava o UUCP, um programa que copiava arquivos de um UNIX para outro.',
    },
    refs: [REF.ritchie, REF.unixOrg],
  },
  bsd: {
    specs: {
      multiuser: sim('Herdou do UNIX: várias pessoas conectadas ao mesmo tempo, cada uma no seu terminal.'),
      multiproc: nao('As versões de Berkeley usavam um só processador. O suporte a vários veio depois, nos descendentes (FreeBSD e OpenBSD).'),
      kernel: { value: KERNEL.mono, note: 'Mesmo modelo do UNIX.' },
      fs: 'FFS ("sistema de arquivos rápido"), criado em 1983 para ler e gravar no disco bem mais rápido que o do UNIX original. Também é chamado de UFS.',
      sharing: 'Trouxe a rede da internet (TCP/IP) e comandos para copiar arquivos entre computadores. Em 1990 ganhou o NFS, que deixa abrir uma pasta de outro computador como se ela estivesse no seu.',
    },
    refs: [REF.freebsdIntro, REF.design44],
  },
  mach: {
    specs: {
      multiuser: parcial('Depende do sistema que roda por cima. O Mach só cuida do básico; quem controla os usuários é outro programa, como o BSD.'),
      multiproc: sim('Foi feito desde o início para computadores com vários processadores.'),
      kernel: { value: KERNEL.micro, note: 'Deixa no núcleo só a memória, os processos e a troca de mensagens entre programas. As primeiras versões ainda tinham partes do BSD dentro; o microkernel "puro" veio na versão 3.0.' },
      fs: 'Não tem sistema de arquivos próprio. Usa o do sistema que roda por cima dele (por exemplo, o do BSD).',
      sharing: 'Não tem. Fica a cargo do sistema que roda por cima dele.',
    },
    refs: [REF.mach, REF.appleMach],
  },
  xnu: {
    specs: {
      multiuser: sim('A parte do BSD permite várias pessoas conectadas ao mesmo tempo, como no UNIX.'),
      multiproc: sim('A parte do Mach divide o trabalho entre vários processadores e núcleos.'),
      kernel: { value: KERNEL.hibrido, note: 'Usa o Mach como base, mas põe o BSD e os drivers (programas que controlam o hardware) dentro do mesmo núcleo. Segundo a Apple, isso o deixa mais confiável que um monolítico e mais rápido que um microkernel puro.' },
      fs: 'HFS+ e APFS, os sistemas de arquivos criados pela Apple.',
      sharing: 'Tem o NFS dentro do kernel, para abrir pastas de outros computadores pela rede. O SMB, usado para conversar com o Windows, fica num componente separado da Apple.',
    },
    refs: [REF.appleKernel, REF.appleMach, REF.xnuSource, REF.xnuNfs],
  },
  darwin: {
    specs: {
      multiuser: sim('É um UNIX completo: várias pessoas podem estar conectadas ao mesmo tempo, por exemplo pelo SSH (acesso remoto pelo terminal).'),
      multiproc: sim('Vem do kernel XNU, que usa vários processadores e núcleos.'),
      kernel: XNU_KERNEL,
      fs: 'HFS+ e, desde 2017, APFS.',
      sharing: 'NFS, para pastas de outros computadores UNIX, e SMB, para pastas do Windows.',
    },
    refs: [REF.appleOss, REF.appleKernel, REF.smbClient],
  },
  macos: {
    specs: {
      multiuser: sim('Além de quem está na frente do Mac, outras pessoas podem entrar ao mesmo tempo pelo Login Remoto (SSH), cada uma na sua sessão.'),
      multiproc: sim('Desde a primeira versão aproveita Macs com mais de um processador. Hoje usa todos os núcleos do chip.'),
      kernel: XNU_KERNEL,
      fs: 'HFS+ até 2017. Desde então, APFS, criado pela Apple pensando nos SSDs (discos rápidos, sem partes móveis).',
      sharing: 'Compartilha pastas pela rede com o SMB, o mesmo usado pelo Windows. Também tem o AirDrop, que manda arquivos sem fio para aparelhos Apple por perto.',
    },
    refs: [REF.appleKernel, REF.macRemoteLogin, REF.apfs, REF.macSharing],
  },
  ios: {
    specs: {
      multiuser: nao('Uma pessoa por aparelho. Até o "iPad Compartilhado", usado em escolas, recebe várias pessoas só uma de cada vez.'),
      multiproc: sim('Os primeiros iPhones tinham um só núcleo. Desde 2011, os chips têm vários, e o iOS usa todos.'),
      kernel: XNU_KERNEL,
      fs: 'HFS+ no início. Desde 2017, APFS.',
      sharing: 'AirDrop (envio sem fio para aparelhos Apple por perto), iCloud Drive (arquivos guardados na nuvem da Apple) e o app Arquivos, que também abre pastas compartilhadas de computadores (SMB).',
    },
    refs: [REF.appleSecurity, REF.apfs, REF.iphoneFiles],
  },
  freebsd: {
    specs: {
      multiuser: sim('Herdou do BSD: várias pessoas conectadas ao mesmo tempo, no próprio computador ou pela rede (SSH).'),
      multiproc: sim('Usa vários processadores desde 1998 (versão 3.0).'),
      kernel: { value: KERNEL.mono, note: 'Monolítico como o BSD, mas aceita encaixar peças novas (módulos) sem precisar reconstruir o kernel.' },
      fs: 'UFS, herdado do BSD, e ZFS, um sistema de arquivos moderno que percebe e corrige dados corrompidos.',
      sharing: 'O NFS já vem no sistema. Para compartilhar com o Windows, instala-se o Samba, programa que fala o SMB, a "língua" de compartilhamento do Windows.',
    },
    refs: [REF.freebsdIntro, REF.freebsdKernel, REF.freebsd30, REF.freebsdZfs, REF.freebsdNet],
  },
  openbsd: {
    specs: {
      multiuser: sim('Herdou do BSD: várias pessoas conectadas ao mesmo tempo, no próprio computador ou pela rede (SSH).'),
      multiproc: sim('Usa vários processadores desde 2004 (versão 3.6).'),
      kernel: { value: KERNEL.mono, note: 'Mesmo modelo do BSD.' },
      fs: 'FFS, herdado do BSD.',
      sharing: 'O NFS já vem no sistema. Também tem o SFTP, que copia arquivos de forma segura e criptografada, criado pelo próprio projeto junto com o OpenSSH. Para o Windows, usa o Samba.',
    },
    refs: [REF.openbsdFaq, REF.openbsdDisk, REF.openbsd36],
  },
  linux: {
    specs: {
      multiuser: sim('Várias pessoas ao mesmo tempo, no próprio computador ou pela rede (SSH).'),
      multiproc: sim('Usa vários processadores desde 1996 (versão 2.0). Hoje roda de celulares a supercomputadores com milhares de núcleos.'),
      kernel: { value: KERNEL.mono, note: 'Monolítico, mas modular: drivers (programas que controlam o hardware) podem ser encaixados e retirados com o sistema ligado.' },
      fs: 'Aceita vários. O mais comum é o ext4. Também lê e grava pendrives e discos do Windows (FAT, exFAT e NTFS).',
      sharing: 'Já tem o NFS no kernel, para compartilhar pastas com outros Linux e UNIX, e consegue abrir pastas compartilhadas do Windows (SMB).',
    },
    refs: [REF.kernelReadme, REF.kernelModules, REF.kernelFs, REF.kernelNfs],
  },
  android: {
    specs: {
      multiuser: nao('Tem perfis para pessoas diferentes, mas só um fica em uso por vez. Por dentro, cada app funciona como um "usuário" separado, mas isso serve para um app não mexer nos dados do outro.'),
      multiproc: sim('Vem do kernel Linux. Hoje o Android usa todos os núcleos do celular.'),
      kernel: LINUX_KERNEL,
      fs: 'ext4 ou F2FS (feito para memória flash, como a dos celulares) na memória interna. Cartões SD e pendrives usam FAT32 ou exFAT.',
      sharing: 'Quick Share (envio sem fio para aparelhos por perto), cabo USB ligado ao computador e apps de nuvem.',
    },
    refs: [REF.androidAbout, REF.androidKernel, REF.androidStorage, REF.androidUsers, REF.quickShare],
  },
  debian: {
    specs: {
      multiuser: sim('Vem do Linux: várias pessoas podem usar ao mesmo tempo, no próprio computador ou pela rede (SSH).'),
      multiproc: sim('Vem do kernel Linux: usa todos os processadores e núcleos do computador.'),
      kernel: LINUX_KERNEL,
      fs: 'ext4, o padrão do Linux.',
      sharing: 'Instalando o Samba, compartilha pastas com o Windows (SMB). Instalando o NFS, com outros Linux.',
    },
    refs: [REF.debianAbout, REF.debianInstall, REF.debianSamba, REF.debianNfs],
  },
  ubuntu: {
    specs: {
      multiuser: sim('Vem do Linux: várias pessoas podem usar ao mesmo tempo, no próprio computador ou pela rede (SSH).'),
      multiproc: sim('Vem do kernel Linux: usa todos os processadores e núcleos do computador.'),
      kernel: LINUX_KERNEL,
      fs: 'ext4, o padrão do Linux. Na instalação, dá para escolher o ZFS.',
      sharing: 'Compartilha pastas pelo gerenciador de arquivos, usando o Samba (compatível com o Windows). Também aceita NFS.',
    },
    refs: [REF.ubuntuAbout, REF.ubuntuSamba],
  },
  mint: {
    specs: {
      multiuser: sim('Vem do Linux: várias pessoas podem usar ao mesmo tempo, no próprio computador ou pela rede (SSH).'),
      multiproc: sim('Vem do kernel Linux: usa todos os processadores e núcleos do computador.'),
      kernel: LINUX_KERNEL,
      fs: 'ext4, o padrão do Linux.',
      sharing: 'Compartilha pastas pelo gerenciador de arquivos (Nemo), usando o Samba (compatível com o Windows). Também tem o Warpinator, app do próprio Mint para enviar arquivos a outro computador da mesma rede.',
    },
    refs: [REF.mintAbout, REF.mintGuide, REF.warpinator],
  },

  // ---------- Linhagem MS-DOS (Microsoft) ----------
  msdos: {
    specs: {
      multiuser: nao('Uma pessoa e um programa por vez.'),
      multiproc: nao('Usa um só processador.'),
      kernel: { value: KERNEL.mono, note: 'Núcleo simples. Um programa com defeito podia travar o computador inteiro.' },
      fs: 'FAT, criado para disquetes. Os nomes de arquivo tinham no máximo 8 letras, mais 3 de extensão, como CARTA.TXT.',
      sharing: 'Não vinha com rede. Para acessar arquivos de outro computador, era preciso comprar e instalar programas à parte.',
    },
    refs: [REF.msdosSource, REF.fat],
  },
  win3x: {
    specs: {
      multiuser: nao('Uma pessoa por vez.'),
      multiproc: nao('Usa um só processador.'),
      kernel: { value: KERNEL.mono, note: 'Não tem kernel próprio: é uma interface gráfica que roda em cima do MS-DOS e usa o kernel dele.' },
      fs: 'Não tem sistema de arquivos próprio: usa o FAT do MS-DOS.',
      sharing: 'A edição Windows for Workgroups (1992) foi a primeira a compartilhar pastas e impressoras entre os PCs de um escritório.',
    },
    refs: [REF.fat, REF.wikiWin3],
  },
  win9x: {
    specs: {
      multiuser: nao('Tinha perfis para pessoas diferentes, mas qualquer um conseguia ver os arquivos dos outros.'),
      multiproc: nao('Usa um só processador, mesmo se o computador tiver mais de um.'),
      kernel: { value: KERNEL.mono, note: 'Mistura código antigo (16 bits) e novo (32 bits) e ainda inicia pelo MS-DOS. Os programas não ficam bem separados na memória, então um erro podia travar tudo.' },
      fs: 'FAT com nomes longos de arquivo e, depois, FAT32, que aceita discos maiores.',
      sharing: 'Compartilha pastas e impressoras com outros PCs da rede local.',
    },
    refs: [REF.fat, REF.wikiWin9x],
  },
  win95: {
    specs: {
      multiuser: nao('Tinha perfis, mas qualquer um conseguia ver os arquivos dos outros.'),
      multiproc: nao('Usa um só processador.'),
      kernel: { value: KERNEL.mono, note: 'Usa o kernel 9.x.' },
      fs: 'FAT com nomes longos de arquivo, como "Trabalho de escola.doc". Uma versão de 1996 trouxe o FAT32, para discos maiores.',
      sharing: 'Pastas e impressoras compartilhadas com outros PCs da rede local, pelo "Ambiente de Rede".',
    },
    refs: [REF.fat, REF.wikiWin95],
  },
  win98: {
    specs: {
      multiuser: nao('Tinha perfis, mas qualquer um conseguia ver os arquivos dos outros.'),
      multiproc: nao('Usa um só processador.'),
      kernel: { value: KERNEL.mono, note: 'Usa o kernel 9.x.' },
      fs: 'FAT32, que aceita discos maiores. Vinha com uma ferramenta para converter discos do FAT antigo para o FAT32.',
      sharing: 'Pastas e impressoras compartilhadas na rede local. A Segunda Edição (1999) permitia dividir uma conexão de internet entre vários PCs.',
    },
    refs: [REF.fat, REF.wikiWin98],
  },
  winnt: {
    specs: {
      multiuser: sim('O kernel consegue manter várias pessoas conectadas ao mesmo tempo, cada uma na sua sessão. O Windows Server usa isso para atender vários usuários à distância. Nos Windows de PC (XP ao 11), a Microsoft limita a uma pessoa por vez.'),
      multiproc: sim('Usa vários processadores desde a primeira versão, de 1993.'),
      kernel: { value: KERNEL.hibrido, note: 'Foi organizado em camadas, como um microkernel. Mas, para ganhar velocidade, roda a maior parte dessas camadas e dos drivers (programas que controlam o hardware) dentro do núcleo.' },
      fs: 'NTFS, criado junto com o NT. Ele guarda quem pode abrir cada arquivo e se recupera melhor quando o PC desliga de repente. Também lê FAT.',
      sharing: 'Compartilha pastas na rede com o SMB, a "língua" que o Windows usa para isso. Em empresas, um servidor central (o domínio) controla os usuários e quem pode abrir cada pasta.',
    },
    refs: [REF.winComponents, REF.kernelMode, REF.rds, REF.ntfs, REF.smb, REF.multiProc],
  },
  winxp: {
    specs: {
      multiuser: NT_MULTIUSER,
      multiproc: sim('Vem do NT. O XP Home aceita 1 processador (com vários núcleos) e o Professional, 2.'),
      kernel: NT_KERNEL,
      fs: 'NTFS. Ainda dava para usar o FAT32, comum em pendrives.',
      sharing: 'Compartilha pastas na rede local (SMB), em casa (grupo de trabalho) ou na empresa (domínio).',
    },
    refs: [lifecycle('windows-xp', 'Windows XP'), REF.multiProc, REF.ntfs, REF.winSharing],
  },
  vista: {
    specs: {
      multiuser: NT_MULTIUSER,
      multiproc: NT_MULTIPROC,
      kernel: NT_KERNEL,
      fs: 'NTFS, agora obrigatório no disco onde o Windows é instalado.',
      sharing: 'Nova versão do SMB, mais rápida, e a Central de Rede e Compartilhamento, que juntou essas opções num lugar só.',
    },
    refs: [lifecycle('windows-vista', 'Windows Vista'), REF.multiProc, REF.smbVersions, REF.ntfs],
  },
  win7: {
    specs: {
      multiuser: NT_MULTIUSER,
      multiproc: NT_MULTIPROC,
      kernel: NT_KERNEL,
      fs: 'NTFS. Pendrives e cartões de memória usam FAT32 ou exFAT.',
      sharing: 'Grupo Doméstico: os PCs da casa compartilham pastas e impressoras usando uma única senha.',
    },
    refs: [lifecycle('windows-7', 'Windows 7'), REF.multiProc, REF.ntfs],
  },
  win8: {
    specs: {
      multiuser: NT_MULTIUSER,
      multiproc: NT_MULTIPROC,
      kernel: NT_KERNEL,
      fs: 'NTFS. Pendrives e cartões de memória usam FAT32 ou exFAT.',
      sharing: 'Nova versão do SMB (3.0) e a nuvem da Microsoft (hoje chamada OneDrive) integrada ao sistema.',
    },
    refs: [lifecycle('windows-8', 'Windows 8'), REF.multiProc, REF.smbVersions, REF.ntfs, REF.fat],
  },
  win10: {
    specs: {
      multiuser: NT_MULTIUSER_ENTERPRISE,
      multiproc: NT_MULTIPROC,
      kernel: NT_KERNEL,
      fs: 'NTFS. Pendrives e cartões de memória usam FAT32 ou exFAT.',
      sharing: 'Pastas na rede (SMB), OneDrive e o Compartilhamento por Proximidade, que manda arquivos sem fio para PCs por perto. O Grupo Doméstico foi removido em 2018.',
    },
    refs: [lifecycle('windows-10-home-and-pro', 'Windows 10'), REF.multiSession, REF.multiProc, REF.ntfs, REF.smb, REF.winSharing],
  },
  win11: {
    specs: {
      multiuser: NT_MULTIUSER_ENTERPRISE,
      multiproc: sim('Vem do NT. É o primeiro Windows que exige processador com pelo menos 2 núcleos.'),
      kernel: NT_KERNEL,
      fs: 'NTFS. Pendrives e cartões de memória usam FAT32 ou exFAT.',
      sharing: 'Pastas na rede (SMB), OneDrive e o Compartilhamento por Proximidade.',
    },
    refs: [lifecycle('windows-11-home-and-pro', 'Windows 11'), REF.win11Req, REF.multiSession, REF.ntfs, REF.smb, REF.winSharing],
  },
};

NODES.forEach((n) => Object.assign(n, FICHAS[n.id]));

const byId = new Map(NODES.map((n) => [n.id, n]));
const typeLabel = (n) => (n.type === 'kernel' ? 'Kernel' : 'Sistema operacional');
const childrenOf = (id) => NODES.filter((n) => n.parents.includes(id));
const treeChildrenOf = (id) => NODES.filter((n) => n.parents[0] === id);

function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (key === 'class') node.className = value;
    else node.setAttribute(key, value);
  }
  node.append(...children);
  return node;
}

/* ---------- Árvore ---------- */

function nodeButton(n) {
  const btn = el('button', {
    class: 'node',
    type: 'button',
    'data-open': n.id,
    'data-family': n.family,
    'data-type': n.type,
    'aria-label': `${n.name}, ${typeLabel(n).toLowerCase()}, ${n.year}`,
  },
  el('span', { class: 'node-name' }, n.name),
  el('span', { class: 'node-year' }, String(n.year)));
  if (n.badge) btn.append(el('span', { class: 'node-badge' }, n.badge));
  return btn;
}

function buildBranch(n) {
  const li = el('li', {}, nodeButton(n));
  const kids = treeChildrenOf(n.id);
  if (kids.length) li.append(el('ul', {}, ...kids.map(buildBranch)));
  return li;
}

function renderTrees() {
  document.querySelectorAll('[data-tree-root]').forEach((tree) => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('tree-links');
    svg.setAttribute('aria-hidden', 'true');
    tree.append(svg, el('ul', {}, buildBranch(byId.get(tree.dataset.treeRoot))));
  });
}

/* Linhas tracejadas para os pais extras (ex.: BSD → XNU), só no modo organograma */
const orgChart = window.matchMedia('(min-width: 760px)');
const SVG_NS = 'http://www.w3.org/2000/svg';

function drawExtraLinks() {
  document.querySelectorAll('.tree').forEach((tree) => {
    const svg = tree.querySelector('.tree-links');
    svg.replaceChildren();
    if (!orgChart.matches) return;

    const box = tree.getBoundingClientRect();
    svg.setAttribute('width', box.width);
    svg.setAttribute('height', box.height);
    svg.setAttribute('viewBox', `0 0 ${box.width} ${box.height}`);
    const defs = document.createElementNS(SVG_NS, 'defs');
    svg.append(defs);

    tree.querySelectorAll('.node').forEach((childBtn) => {
      const child = byId.get(childBtn.dataset.open);
      child.parents.slice(1).forEach((pid) => {
        const parentBtn = tree.querySelector(`.node[data-open="${pid}"]`);
        if (!parentBtn) return;
        const p = parentBtn.getBoundingClientRect();
        const c = childBtn.getBoundingClientRect();
        const parentIsRight = p.left > c.right;
        const x1 = (parentIsRight ? p.left : p.right) - box.left;
        const y1 = p.top + p.height / 2 - box.top;
        const x2 = (parentIsRight ? c.right : c.left) - box.left;
        const y2 = c.top + c.height / 2 - box.top;
        const dx = parentIsRight ? -48 : 48;

        const color = `var(--c-${byId.get(pid).family})`;
        const markerId = `arrow-${pid}-${child.id}`;
        const marker = document.createElementNS(SVG_NS, 'marker');
        marker.setAttribute('id', markerId);
        marker.setAttribute('viewBox', '0 0 10 10');
        marker.setAttribute('refX', '9');
        marker.setAttribute('refY', '5');
        marker.setAttribute('markerWidth', '7');
        marker.setAttribute('markerHeight', '7');
        marker.setAttribute('orient', 'auto');
        const tip = document.createElementNS(SVG_NS, 'path');
        tip.setAttribute('d', 'M0 0 L10 5 L0 10 z');
        tip.style.fill = color;
        marker.append(tip);
        defs.append(marker);

        const path = document.createElementNS(SVG_NS, 'path');
        path.setAttribute('d', `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`);
        path.setAttribute('marker-end', `url(#${markerId})`);
        path.style.stroke = color;
        svg.append(path);
      });
    });
  });
}

/* ---------- Filtro por família ---------- */

function applyFilter(filter) {
  document.querySelectorAll('[data-filter]').forEach((btn) => {
    btn.setAttribute('aria-pressed', String(btn.dataset.filter === filter));
  });
  document.querySelectorAll('.tree .node').forEach((btn) => {
    const fam = btn.dataset.family;
    // O UNIX continua visível ao filtrar qualquer uma das famílias que descendem dele
    const visible = filter === 'all' || fam === filter || (fam === 'unix' && filter !== 'microsoft');
    btn.classList.toggle('is-dimmed', !visible);
  });
}

/* ---------- Destaque de parentes ao passar o mouse ---------- */

function setRelated(id, on) {
  const n = byId.get(id);
  const ids = [...n.parents, ...childrenOf(id).map((c) => c.id)];
  ids.forEach((rid) => {
    document.querySelectorAll(`.tree .node[data-open="${rid}"]`).forEach((b) => b.classList.toggle('is-related', on));
  });
}

/* ---------- Painel de detalhes ---------- */

const dialog = document.getElementById('node-dialog');

function relButton(n) {
  return el('button', { class: 'rel-btn', type: 'button', 'data-open': n.id, 'data-family': n.family },
    n.name, el('span', {}, String(n.year)));
}

const BADGE_LABEL = { sim: 'Sim', nao: 'Não', parcial: 'Parcial' };

// Uma linha da ficha técnica. spec pode ser texto, { value, note } com sim/nao/parcial ou { value, note } com texto livre.
function specRow(label, spec, hint) {
  const value = el('dd');
  if (typeof spec === 'string') {
    value.append(spec);
  } else if (BADGE_LABEL[spec.value]) {
    value.append(el('span', { class: `spec-badge spec-badge--${spec.value}` }, BADGE_LABEL[spec.value]));
    if (spec.note) value.append(' ', spec.note);
  } else {
    value.append(el('strong', {}, spec.value));
    if (spec.note) value.append(' ', spec.note);
  }
  const term = el('dt', {}, label);
  if (hint) term.append(el('span', { class: 'spec-hint' }, hint));
  return el('div', { class: 'spec-row' }, term, value);
}

function showDetails(id) {
  const n = byId.get(id);
  if (!n) return;
  const d = (key) => dialog.querySelector(`[data-d="${key}"]`);

  dialog.dataset.family = n.family;
  d('family').textContent = FAMILIES[n.family];
  d('type').textContent = typeLabel(n);
  d('name').textContent = n.name;
  d('year').textContent = String(n.year);
  d('desc').textContent = n.desc;

  const parents = n.parents.map((pid) => byId.get(pid));
  d('parents').replaceChildren(...(parents.length
    ? parents.map(relButton)
    : [el('p', { class: 'rel-empty' }, 'É uma das raízes da árvore.')]));

  const kids = childrenOf(id);
  d('children').replaceChildren(...(kids.length
    ? kids.map(relButton)
    : [el('p', { class: 'rel-empty' }, 'Nenhum descendente nesta árvore.')]));

  const { specs } = n;
  d('specs').replaceChildren(
    specRow('Multiusuário', specs.multiuser, 'vários usuários usando ao mesmo tempo'),
    specRow('Multiprocessado', specs.multiproc, 'usa vários processadores ou núcleos'),
    specRow('Tipo de kernel', specs.kernel, 'como o núcleo é organizado'),
    specRow('Sistema de arquivos', specs.fs, 'como os arquivos são guardados no disco'),
    specRow('Compartilhamento de arquivos', specs.sharing, 'como passar arquivos para outras pessoas e computadores'),
  );

  d('refs').replaceChildren(...n.refs.map((ref) => el('li', {},
    el('a', { href: ref.url, target: '_blank', rel: 'noopener' }, ref.label))));

  document.querySelectorAll('.tree .node.is-active').forEach((b) => b.classList.remove('is-active'));
  document.querySelectorAll(`.tree .node[data-open="${id}"]`).forEach((b) => b.classList.add('is-active'));

  if (!dialog.open) dialog.showModal();
  dialog.querySelector('.dialog-close').focus();
}

/* ---------- Linha do tempo ---------- */

function decadeLabel(decade) {
  return decade < 2000 ? `Anos ${decade % 100}` : `Anos ${decade}`;
}

function renderTimeline() {
  const timeline = document.getElementById('timeline');
  const sorted = [...NODES].sort((a, b) => a.year - b.year); // sort estável: empate mantém a ordem de NODES
  const decades = new Map();
  sorted.forEach((n) => {
    const decade = Math.floor(n.year / 10) * 10;
    if (!decades.has(decade)) decades.set(decade, []);
    decades.get(decade).push(n);
  });

  decades.forEach((items, decade) => {
    const list = el('ol', { class: 'tl-list' }, ...items.map((n) => el('li', { class: 'tl-item', 'data-family': n.family },
      el('button', { class: 'tl-btn', type: 'button', 'data-open': n.id },
        el('span', { class: 'tl-dot', 'aria-hidden': 'true' }),
        el('span', { class: 'tl-year' }, String(n.year)),
        el('span', { class: 'tl-body' },
          el('span', { class: 'tl-name' }, n.name),
          el('span', { class: 'tl-meta' }, `${typeLabel(n)} · ${FAMILIES[n.family]}`))))));
    timeline.append(el('div', { class: 'tl-decade reveal' }, el('h3', {}, decadeLabel(decade)), list));
  });
}

/* ---------- Cards das famílias e números do topo ---------- */

function renderFamilyChips() {
  document.querySelectorAll('[data-family-list]').forEach((list) => {
    const fam = list.dataset.familyList;
    list.append(...NODES.filter((n) => n.family === fam)
      .map((n) => el('li', {}, el('button', { class: 'chip-btn', type: 'button', 'data-open': n.id }, n.name))));
  });
}

function renderStats() {
  const years = NODES.map((n) => n.year);
  const set = (key, value) => {
    const target = document.querySelector(`[data-stat="${key}"]`);
    if (target) target.textContent = value;
  };
  set('kernels', NODES.filter((n) => n.type === 'kernel').length);
  set('so', NODES.filter((n) => n.type === 'so').length);
  set('span', `${Math.min(...years)}–${Math.max(...years)}`);
}

/* ---------- Animação ao rolar ---------- */

function setupReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  items.forEach((item) => observer.observe(item));
}

/* ---------- Inicialização ---------- */

document.addEventListener('DOMContentLoaded', () => {
  renderTrees();
  renderTimeline();
  renderFamilyChips();
  renderStats();
  setupReveal();

  // Um único listener para tudo que abre detalhes (árvore, linha do tempo, chips, painel)
  document.addEventListener('click', (event) => {
    const opener = event.target.closest('[data-open]');
    if (opener) showDetails(opener.dataset.open);
  });

  document.querySelectorAll('[data-filter]').forEach((btn) => {
    btn.addEventListener('click', () => applyFilter(btn.dataset.filter));
  });

  document.querySelectorAll('.tree').forEach((tree) => {
    tree.addEventListener('pointerover', (e) => {
      const node = e.target.closest('.node');
      if (node && !node.contains(e.relatedTarget)) setRelated(node.dataset.open, true);
    });
    tree.addEventListener('pointerout', (e) => {
      const node = e.target.closest('.node');
      if (node && !node.contains(e.relatedTarget)) setRelated(node.dataset.open, false);
    });
    tree.addEventListener('focusin', (e) => e.target.matches('.node') && setRelated(e.target.dataset.open, true));
    tree.addEventListener('focusout', (e) => e.target.matches('.node') && setRelated(e.target.dataset.open, false));
  });

  // Fechar o painel ao clicar fora dele
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.querySelectorAll('.tree .node.is-active').forEach((b) => b.classList.remove('is-active'));
  });

  // Redesenha as linhas tracejadas sempre que o tamanho da árvore mudar
  const resizeObserver = new ResizeObserver(drawExtraLinks);
  document.querySelectorAll('.tree').forEach((tree) => resizeObserver.observe(tree));
  orgChart.addEventListener('change', drawExtraLinks);
  document.fonts?.ready.then(drawExtraLinks);
});
