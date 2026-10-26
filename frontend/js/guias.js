// Contenido de las guías, organizado por nivel (según BR) y tipo de vehículo.
// Los BR son aproximados: cambian con las actualizaciones del juego.

const LEVELS = {
    principiante: {
        nombre: "Principiante",
        br: "BR 1.0 – 3.0 (aprox.)",
        resumen:
            "Estás aprendiendo los controles, a sobrevivir más tiempo y a ganar tus primeros Silver Lions. " +
            "Los vehículos de este rango son simples: sin radar, sin misiles y con blindaje y cañones sencillos.",
        aprender: [
            "Moverte, apuntar y disparar con comodidad",
            "Usar la cobertura y el minimapa",
            "Elegir bien la munición básica",
            "Cuidar tu economía (Silver Lions)"
        ],
        noPorAhora: [
            "Aviones a reacción y misiles (no llegan hasta BR más altos)",
            "Visión térmica y sistemas modernos",
            "Modo Simulador"
        ]
    },
    intermedio: {
        nombre: "Intermedio",
        br: "BR 3.0 – 6.0 (aprox.)",
        resumen:
            "Ya dominás lo básico. Ahora importa entender por qué un disparo penetra o rebota, cómo se gana " +
            "una pelea aérea con energía y cómo se controlan los daños en un barco. Hacia el final de este " +
            "rango aparecen los primeros aviones a reacción.",
        aprender: [
            "Blindaje, ángulos y módulos internos",
            "Gestión de energía y del motor en el aire",
            "Control de daños y puntería en el mar",
            "Jugar en modo Realista"
        ],
        noPorAhora: [
            "Misiles guiados y contramedidas",
            "Sistemas electrónicos modernos"
        ]
    },
    avanzado: {
        nombre: "Avanzado",
        br: "BR 6.0 en adelante (aprox.)",
        resumen:
            "Los vehículos incorporan tecnología moderna: aviones a reacción, misiles, radar, visión térmica " +
            "y munición avanzada. La información y la coordinación pesan tanto como la puntería.",
        aprender: [
            "Aviones a reacción, misiles y contramedidas",
            "Munición moderna y blindaje compuesto",
            "Combate naval a larga distancia",
            "Trabajo en escuadra y modo Simulador"
        ],
        noPorAhora: []
    }
};

const TYPES = {
    tanque: "Tanques",
    avion: "Aviones",
    barco: "Barcos"
};

const GUIDES = [
    /* ---------------- PRINCIPIANTE ---------------- */
    {
        level: "principiante",
        type: "tanque",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/M4_Sherman_Utah_Beach.jpg/960px-M4_Sherman_Utah_Beach.jpg",
        alt: "Tanque M4 Sherman",
        vehicle: "Ejemplo: M4 Sherman (EE. UU.)",
        title: "Tu primer tanque: posición, puntería y munición",
        intro:
            "Un tanque de inicio no aguanta muchos impactos. Ganar no depende de ser el más fuerte, " +
            "sino de ver primero, disparar primero y no quedarte quieto.",
        steps: [
            "Empezá en modo <strong>Arcade</strong>: ayuda con la puntería y te deja concentrarte en aprender.",
            "Ubicá una posición con <strong>cobertura</strong> (una loma, un muro, un edificio) con buena vista del enemigo.",
            "Asomate lo justo, apuntá al <strong>centro de la silueta</strong> (es la zona más grande y fácil de acertar) y disparás.",
            "Apenas disparás, <strong>cambiá de posición</strong>: el rival ya vio de dónde vino el tiro.",
            "Mirá el <strong>minimapa</strong> cada pocos segundos para saber dónde está tu equipo y dónde el enemigo."
        ],
        concepts: [
            ["BR (Battle Rating)", "Número que mide la fuerza de un vehículo. El juego te empareja con rivales de BR cercano."],
            ["Silver Lions (SL)", "La moneda del juego. Se gana jugando y se gasta en comprar y reparar vehículos."],
            ["Munición AP", "Proyectil macizo que perfora blindaje. Es la opción general para pelear contra otros tanques."],
            ["Munición HE", "Proyectil explosivo. Sirve contra vehículos livianos y para dañar sin perforar mucho blindaje."]
        ],
        mistakes: [
            "Quedarte quieto en campo abierto después de disparar.",
            "Avanzar solo hacia el punto de captura, sin apoyo del equipo.",
            "No mirar el minimapa y que te flanqueen.",
            "Gastar todos tus Silver Lions sin dejar para reparar."
        ],
        practice:
            "Jugá 5 partidas con el mismo tanque. Objetivo: en cada una, cambiar de posición después de cada disparo y " +
            "sobrevivir más de 3 minutos. No te preocupes por los puntos todavía.",
        ask: "Soy nuevo en tanques. ¿Qué tipos de munición debo usar y cuándo?"
    },
    {
        level: "principiante",
        type: "avion",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Messerschmitt_Bf_109_G-6R3.jpg/960px-Messerschmitt_Bf_109_G-6R3.jpg",
        alt: "Avión Messerschmitt Bf 109",
        vehicle: "Ejemplo: Bf 109 (Alemania)",
        title: "Tus primeros vuelos: velocidad y ataques simples",
        intro:
            "A este nivel volás aviones de hélice con ametralladoras y cañones. Todavía no hay aviones a reacción " +
            "ni misiles, así que no necesitás saber cómo funcionan: concentrate en no perder velocidad y en aterrizar a salvo.",
        steps: [
            "Elegí <strong>Arcade</strong> y el control con ratón: es la forma más fácil de empezar a apuntar.",
            "Despegá, subí y buscá altura: <strong>la altura es energía</strong> que podés cambiar por velocidad.",
            "Atacá desde arriba con <strong>ráfagas cortas</strong> y alejate; no te quedes girando pegado al enemigo.",
            "Controlá el <strong>combustible</strong> y el daño de tu avión.",
            "Cuando estés dañado o sin munición, <strong>volvé al aeródromo</strong> para aterrizar, reparar y rearmar."
        ],
        concepts: [
            ["Energía", "Velocidad + altura. Gastarla en giros cerrados te deja lento y fácil de derribar."],
            ["Pérdida de sustentación (stall)", "Si vas muy lento o giras de más, el avión deja de volar bien y cae."],
            ["Boom and zoom", "Atacar rápido desde arriba y volver a ganar altura, en lugar de pelear en giros."],
            ["Convergencia", "Distancia a la que se cruzan los disparos de las armas. Disparar a esa distancia concentra el daño."]
        ],
        mistakes: [
            "Girar muy cerrado a baja velocidad.",
            "Volar pegado al suelo, sin espacio para recuperarte.",
            "Perseguir a un enemigo hasta la base rival, sin mirar a tu alrededor.",
            "Disparar de muy lejos y gastar toda la munición."
        ],
        practice:
            "En tus próximas partidas, intentá 3 ataques desde arriba por partida. Cuenta como logrado si te alejás " +
            "después del ataque, aunque no derribes al enemigo.",
        ask: "Soy principiante en aviones. ¿Cómo evito perder velocidad en combate?"
    },
    {
        level: "principiante",
        type: "barco",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/PT_boat_underway_c1945.jpg/960px-PT_boat_underway_c1945.jpg",
        alt: "Lancha torpedera PT",
        vehicle: "Ejemplo: lancha torpedera PT (EE. UU.)",
        title: "Flota de bahía: lanchas rápidas y frágiles",
        intro:
            "Las lanchas de inicio son rápidas pero se destruyen con pocos impactos. Funcionan mejor usando " +
            "la costa como cobertura y los torpedos como arma principal.",
        steps: [
            "Usá las <strong>islas y la costa</strong> para esconder tu silueta y asomarte sólo para atacar.",
            "No quedes <strong>quieto ni en línea recta</strong> mucho tiempo: moverte hace más difícil que te apunten.",
            "Con los torpedos, apuntá <strong>delante del enemigo</strong> (adelantamiento), no hacia donde está ahora.",
            "Ante un incendio o una fuga, atendé el <strong>control de daños</strong> cuando ya no estés bajo fuego."
        ],
        concepts: [
            ["Adelantamiento", "Apuntar a donde estará el blanco, no donde está. Es clave con torpedos y artillería."],
            ["Silueta", "El tamaño con que te ve el enemigo. Mostrarte de frente o desde atrás te hace más pequeño."],
            ["Control de daños", "Acciones de la tripulación para apagar incendios y reparar fugas."]
        ],
        mistakes: [
            "Cruzar aguas abiertas sin cobertura.",
            "Disparar los torpedos hacia donde el enemigo está en ese momento.",
            "Ignorar los incendios hasta que es tarde."
        ],
        practice:
            "Jugá 3 partidas quedándote siempre cerca de una isla o de la costa. Probá lanzar torpedos " +
            "adelantándote al rumbo del enemigo y observá si aciertan.",
        ask: "Soy nuevo en barcos. ¿Cómo apunto con los torpedos de una lancha?"
    },

    /* ---------------- INTERMEDIO ---------------- */
    {
        level: "intermedio",
        type: "tanque",
        img: "https://staticfiles.warthunder.com/upload/image/%21%20Screenshots%2F7RB_dSlRUmA_23c41f60b29a2d38208eab7dc4797a45.jpg",
        alt: "Tanque de la Segunda Guerra Mundial en War Thunder",
        vehicle: "Ejemplos: Tiger I (Alemania), Panther (Alemania), T-34-85 (URSS)",
        title: "Blindaje, ángulos y módulos internos",
        intro:
            "En este rango dejás de ver al tanque como una caja y empezás a pensar en lo que hay dentro: " +
            "la munición, la tripulación y el motor. Un buen disparo puede dejar fuera de combate a un rival sin destruirlo del todo.",
        steps: [
            "<strong>Angulá el casco</strong> hacia el enemigo: un blindaje inclinado tiene más espesor efectivo y rebota más.",
            "Conocé a los rivales de tu BR: dónde son fuertes y dónde débiles, antes de enfrentarlos.",
            "Apuntá a <strong>módulos</strong> (munición, motor) y <strong>tripulantes</strong> cuando no puedas perforar de frente.",
            "Probá el modo <strong>Realista</strong>: sin marcador de puntería, te obliga a estimar la distancia.",
            "Flanqueá por rutas alternativas y usá el humo para reposicionarte."
        ],
        concepts: [
            ["Espesor efectivo", "El blindaje inclinado parece más grueso para el proyectil, por eso angular ayuda."],
            ["Penetración", "Cuánto blindaje puede perforar tu munición. Depende del tipo de proyectil y de la distancia."],
            ["Rebote", "Si el proyectil golpea con ángulo muy cerrado, puede rebotar sin perforar."],
            ["Módulos y tripulación", "Daños internos (munición, motor, tripulantes) que pueden dejar a un tanque sin combate."]
        ],
        mistakes: [
            "Creer que un blindaje frontal grueso es invulnerable sin angularlo.",
            "Mostrar el costado al enemigo.",
            "Usar siempre la misma munición sin considerar el blanco.",
            "No usar el humo."
        ],
        practice:
            "Tomá un tanque de este rango y buscá en la wiki dónde está su munición y su tripulación. " +
            "En las próximas partidas intentá apuntar a esos puntos en tus rivales.",
        ask: "¿Cómo funciona el espesor efectivo y cómo angulo mi tanque en War Thunder?"
    },
    {
        level: "intermedio",
        type: "avion",
        img: "https://staticfiles.warthunder.com/upload/image/%21%20Screenshots%2FDcup7GJdxG4_fd503aad348e2b3cf43559462d2b1eaa.jpg",
        alt: "Avión de la Segunda Guerra Mundial en War Thunder",
        vehicle: "Ejemplos: Spitfire (Gran Bretaña), Bf 109 tardío (Alemania), bombarderos",
        title: "Energía, motor y bombarderos",
        intro:
            "El combate aéreo de hélice se gana con energía. Ya no basta con volar: tenés que decidir cuándo " +
            "pelear, cuándo escapar y cómo cuidar el motor. Hacia el final de este rango aparecen los primeros jets.",
        steps: [
            "Diferenciá los aviones de <strong>giro</strong> (maniobran mejor) de los de <strong>energía</strong> (aceleran y suben mejor) y elegí tu pelea.",
            "Usá los <strong>flaps de combate</strong> para cerrar el giro con cuidado, sin pasarte de velocidad.",
            "Vigilá la <strong>temperatura del motor</strong> y el radiador; el sobrecalentamiento te deja sin potencia.",
            "Con bombarderos, elegí objetivos y <strong>planificá el ataque</strong> antes de acercarte.",
            "Practicá en modo <strong>Realista</strong>: tenés un solo avión y cada decisión cuenta."
        ],
        concepts: [
            ["Avión de energía vs. de giro", "Dos estilos de combate. Conocer tu avión te dice si debés girar o escapar."],
            ["Flaps de combate", "Superficies que permiten girar más cerrado, pero sólo a velocidades seguras."],
            ["Potencia de emergencia (WEP)", "Aumento temporal de potencia que castiga el motor si se usa de más."],
            ["Primeros jets", "Aviones sin hélice que aparecen cerca de BR 5.0 a 6.0 (aprox.). Sus reglas son distintas: más velocidad y más distancia."]
        ],
        mistakes: [
            "Pelear a giro contra un avión que gira mejor que el tuyo.",
            "Ignorar la temperatura del motor.",
            "Bombardear sin reconocer antes el objetivo.",
            "Intentar manejar un jet igual que un avión de hélice."
        ],
        practice:
            "Elegí tu avión y revisá si es de energía o de giro. Jugá 3 partidas peleando sólo de la forma que le conviene.",
        ask: "¿Qué diferencia hay entre un avión de energía y uno de giro en War Thunder?"
    },
    {
        level: "intermedio",
        type: "barco",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/USS_Fletcher_%28DD-445%29_off_New_York%2C_1942.jpg/960px-USS_Fletcher_%28DD-445%29_off_New_York%2C_1942.jpg",
        alt: "Destructor USS Fletcher",
        vehicle: "Ejemplo: destructor clase Fletcher (EE. UU.)",
        title: "Destructores, cruceros y control de daños",
        intro:
            "En la flota de costa tenés más armas y más resistencia, pero también más cosas que atender. " +
            "Ganar significa corregir bien la puntería y mantener el barco a flote.",
        steps: [
            "Combiná <strong>cañones y torpedos</strong> según la distancia y el tamaño del blanco.",
            "Mirá dónde caen tus proyectiles (las <strong>salpicaduras</strong>) y corregí el siguiente disparo.",
            "Reparar y apagar incendios a tiempo evita perder <strong>módulos</strong> clave.",
            "Elegí la munición según el blanco: perforante contra blindaje, explosiva contra casco liviano.",
            "Usá islas y humo para cortar la línea de fuego cuando te focalicen."
        ],
        concepts: [
            ["Salpicadura", "El agua que levanta un proyectil al caer. Es la referencia para corregir la puntería."],
            ["Compartimentos", "Zonas del barco (munición, motor) que, dañadas, pueden hundirlo."],
            ["Corrección de tiro", "Ajustar el siguiente disparo según dónde cayó el anterior."]
        ],
        mistakes: [
            "No corregir la puntería después de errar.",
            "Dejar un incendio sin atender.",
            "Mostrarte de costado a un rival más fuerte."
        ],
        practice:
            "Jugá una partida concentrándote sólo en observar las salpicaduras y corregir tus disparos.",
        ask: "¿Cómo uso bien los torpedos y el control de daños en un destructor?"
    },

    /* ---------------- AVANZADO ---------------- */
    {
        level: "avanzado",
        type: "tanque",
        img: "https://staticfiles.warthunder.com/upload/image/%21%20Screenshots%2F2R0o0mQAoOs_f5be8077b3275f1533bd584771b13f9e.jpg",
        alt: "Tanque moderno en War Thunder",
        vehicle: "Ejemplos: tanques de batalla modernos (Leopard 2, Challenger, T-80, Abrams, entre otros)",
        title: "Tanques modernos: información y munición avanzada",
        intro:
            "Con munición moderna, blindaje compuesto y sistemas de visión, ver primero es más importante que aguantar. " +
            "Además, un tanque puede ser atacado desde el aire.",
        steps: [
            "Aprendé la diferencia entre munición cinética (<strong>APFSDS</strong>) y de carga hueca (<strong>HEAT</strong>).",
            "Usá la <strong>visión térmica</strong> y el <strong>telémetro</strong> para pelear a larga distancia, si tu vehículo los tiene.",
            "Estudiá los <strong>puntos débiles</strong> de cada rival antes de enfrentarlo; cada modelo es distinto.",
            "Contá con amenazas <strong>aéreas</strong> (aviones y helicópteros) y tené un plan para ellas.",
            "Coordiná con tu escuadra: informar posiciones vale más que un disparo."
        ],
        concepts: [
            ["APFSDS", "Proyectil cinético largo y rápido, el estándar contra blindaje moderno."],
            ["HEAT", "Munición de carga hueca; su efecto no depende de la velocidad del proyectil."],
            ["Blindaje reactivo (ERA)", "Placas explosivas que reducen el daño de ciertos proyectiles."],
            ["Visión térmica", "Permite ver el calor de los vehículos, incluso con humo o de noche."]
        ],
        mistakes: [
            "Confiar demasiado en el blindaje compuesto sin conocer sus zonas débiles.",
            "Ignorar las amenazas aéreas.",
            "Pelear solo, sin informar al equipo."
        ],
        practice:
            "Elegí un vehículo de este rango y revisá en la wiki sus zonas vulnerables. " +
            "Luego jugá una partida con el objetivo de informar al equipo cada vez que veas un rival.",
        ask: "¿Qué diferencia hay entre APFSDS y HEAT y cuándo conviene cada una?"
    },
    {
        level: "avanzado",
        type: "avion",
        img: "https://staticfiles.warthunder.com/upload/image/%21%20Screenshots%2FbLqI7yLBqJY_26a66723762ae4d5a0265832b0b5ea37.jpg",
        alt: "Caza a reacción en War Thunder",
        vehicle: "Ejemplos: F-86, MiG-15 y cazas modernos con misiles",
        title: "Aviones a reacción, misiles y contramedidas",
        intro:
            "En este rango todo ocurre más rápido y a más distancia. Aquí sí importa cómo funciona un jet: " +
            "no se maneja como un avión de hélice y los misiles cambian la forma de pelear.",
        steps: [
            "Respetá los <strong>límites de velocidad</strong>: a alta velocidad los controles se endurecen.",
            "Aprendé qué misil lleva tu avión (<strong>infrarrojo</strong> o <strong>radar</strong>) y sus limitaciones.",
            "Usá <strong>contramedidas</strong> (bengalas) para desviar misiles que te persigan.",
            "Gestioná tu <strong>energía</strong>: recuperarla lleva más tiempo que en un avión de hélice.",
            "Probá el modo <strong>Simulador</strong> cuando estés cómodo."
        ],
        concepts: [
            ["Misil infrarrojo", "Busca el calor del motor del blanco. Se puede engañar con bengalas."],
            ["Misil por radar", "Sigue la señal del radar. Exige mantener al blanco 'iluminado'."],
            ["Contramedidas", "Bengalas o señuelos que desvían misiles."],
            ["Compresibilidad", "A velocidades muy altas el avión se vuelve pesado de manejar y puede perder control."]
        ],
        mistakes: [
            "Pasarte del límite de velocidad y perder control.",
            "Disparar misiles sin tener al blanco bien fijado.",
            "No usar contramedidas a tiempo."
        ],
        practice:
            "En una partida, practicá sólo mantener tu energía y evitar pasar el límite de velocidad. " +
            "Después sumá el uso de misiles.",
        ask: "¿Cómo funcionan los misiles infrarrojos y las bengalas en War Thunder?"
    },
    {
        level: "avanzado",
        type: "barco",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Battleship_Bismarck_under_fire_and_burning_1941.jpg/960px-Battleship_Bismarck_under_fire_and_burning_1941.jpg",
        alt: "Acorazado Bismarck",
        vehicle: "Ejemplo: acorazado Bismarck (Alemania)",
        title: "Flota de alta mar: acorazados y larga distancia",
        intro:
            "Los barcos grandes pelean a gran distancia con artillería pesada. Aguantan mucho, pero un error " +
            "puede perder una partida entera.",
        steps: [
            "Estimá bien la <strong>distancia</strong>: a larga distancia los proyectiles tardan en llegar.",
            "Mostrá el <strong>ángulo</strong> adecuado del casco para que los proyectiles reboten.",
            "Elegí la <strong>munición</strong> según el blanco y su blindaje.",
            "Protegé tus <strong>compartimentos clave</strong> (munición, motores).",
            "Coordiná con el equipo y estate atento a los ataques <strong>aéreos</strong>."
        ],
        concepts: [
            ["Compartimentos", "Zonas del barco cuya destrucción puede hundirlo de golpe."],
            ["Ángulo de blindaje", "Girar el casco hace que los proyectiles reboten más."],
            ["Tiempo de vuelo", "A larga distancia el proyectil tarda segundos en llegar: hay que adelantarse al blanco."]
        ],
        mistakes: [
            "Mostrar el costado a un rival fuerte.",
            "No calcular el tiempo de vuelo de los proyectiles.",
            "Descuidar la defensa antiaérea."
        ],
        practice:
            "Jugá una partida peleando sólo a larga distancia y anotá cuántos disparos aciertan.",
        ask: "¿Cómo juego bien con un acorazado en War Thunder?"
    }
];

const TIPS = [
    { level: "principiante", icon: "💰", title: "No gastes todo de golpe",
      text: "Dejá siempre algunos Silver Lions para reparar tu vehículo y poder seguir jugando." },
    { level: "principiante", icon: "🎮", title: "Empezá en Arcade",
      text: "Es el modo más sencillo. Ya habrá tiempo para Realista y Simulador." },
    { level: "principiante", icon: "🧭", title: "Mirá el minimapa",
      text: "Te dice dónde está tu equipo y dónde está el enemigo. Es la mejor herramienta de un principiante." },
    { level: "principiante", icon: "🔁", title: "Elegí una nación y quedate",
      text: "Avanzar en una sola nación te permite aprender sus vehículos antes de saltar a otras." },
    { level: "principiante", icon: "🔧", title: "Investigá módulos primero",
      text: "Mejorar los módulos de tu vehículo actual suele rendir más que correr hacia el siguiente." },

    { level: "intermedio", icon: "📐", title: "Conocé tu BR",
      text: "Mirá contra qué rivales te vas a enfrentar. Cada rival tiene fortalezas y debilidades distintas." },
    { level: "intermedio", icon: "🧪", title: "Revisá la wiki",
      text: "La wiki oficial tiene datos de cada vehículo. Consultala antes de usar uno nuevo." },
    { level: "intermedio", icon: "👥", title: "Jugá con tu equipo",
      text: "Una escuadra coordinada gana más partidas que jugadores sueltos." },
    { level: "intermedio", icon: "🎬", title: "Mirá tus repeticiones",
      text: "Revisar cómo moriste es la forma más rápida de mejorar." },
    { level: "intermedio", icon: "🛠️", title: "Probá el modo Realista",
      text: "Cuando domines lo básico, el modo Realista te obliga a pensar más." },

    { level: "avanzado", icon: "🛰️", title: "Información sobre todo",
      text: "Con sensores modernos, informar posiciones al equipo vale tanto como disparar." },
    { level: "avanzado", icon: "🎯", title: "Estudiá a tus rivales",
      text: "Conocé sus zonas débiles y su armamento antes de enfrentarlos." },
    { level: "avanzado", icon: "🧰", title: "Planificá tu alineación",
      text: "Combiná vehículos que se complementen para cubrir distintas situaciones." },
    { level: "avanzado", icon: "🕹️", title: "Probá el modo Simulador",
      text: "Si buscás un desafío mayor, es la experiencia más exigente del juego." },
    { level: "avanzado", icon: "📚", title: "Seguí aprendiendo",
      text: "El juego cambia con las actualizaciones: revisá novedades en el sitio oficial." }
];
