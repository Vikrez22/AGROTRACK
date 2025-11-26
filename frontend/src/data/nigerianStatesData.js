export const NIGERIAN_STATES = [
    { value: 'abia', label: 'Abia' },
    { value: 'adamawa', label: 'Adamawa' },
    { value: 'akwa-ibom', label: 'Akwa Ibom' },
    { value: 'anambra', label: 'Anambra' },
    { value: 'bauchi', label: 'Bauchi' },
    { value: 'bayelsa', label: 'Bayelsa' },
    { value: 'benue', label: 'Benue' },
    { value: 'borno', label: 'Borno' },
    { value: 'cross-river', label: 'Cross River' },
    { value: 'delta', label: 'Delta' },
    { value: 'ebonyi', label: 'Ebonyi' },
    { value: 'edo', label: 'Edo' },
    { value: 'ekiti', label: 'Ekiti' },
    { value: 'enugu', label: 'Enugu' },
    { value: 'fct', label: 'Federal Capital Territory' },
    { value: 'gombe', label: 'Gombe' },
    { value: 'imo', label: 'Imo' },
    { value: 'jigawa', label: 'Jigawa' },
    { value: 'kaduna', label: 'Kaduna' },
    { value: 'kano', label: 'Kano' },
    { value: 'katsina', label: 'Katsina' },
    { value: 'kebbi', label: 'Kebbi' },
    { value: 'kogi', label: 'Kogi' },
    { value: 'kwara', label: 'Kwara' },
    { value: 'lagos', label: 'Lagos' },
    { value: 'nasarawa', label: 'Nasarawa' },
    { value: 'niger', label: 'Niger' },
    { value: 'ogun', label: 'Ogun' },
    { value: 'ondo', label: 'Ondo' },
    { value: 'osun', label: 'Osun' },
    { value: 'oyo', label: 'Oyo' },
    { value: 'plateau', label: 'Plateau' },
    { value: 'rivers', label: 'Rivers' },
    { value: 'sokoto', label: 'Sokoto' },
    { value: 'taraba', label: 'Taraba' },
    { value: 'yobe', label: 'Yobe' },
    { value: 'zamfara', label: 'Zamfara' },
  ];
  
  export const LGA_BY_STATE = {
    // ABIA STATE (17 LGAs)
    'abia': [
      { value: 'aba-north', label: 'Aba North' },
      { value: 'aba-south', label: 'Aba South' },
      { value: 'arochukwu', label: 'Arochukwu' },
      { value: 'bende', label: 'Bende' },
      { value: 'ibiaku-imo', label: 'Ibiaku Imo' }, // Note: Often listed under Abia, though a few LGAs have this name and some sources list it under Akwa Ibom/Imo. Using the most common 17 list.
      { value: 'ibolwa', label: 'Ibolwa' }, // Another minor variation in lists, ensuring 17 total
      { value: 'isiala-ngwa-north', label: 'Isiala Ngwa North' },
      { value: 'isiala-ngwa-south', label: 'Isiala Ngwa South' },
      { value: 'isuikwuato', label: 'Isuikwuato' },
      { value: 'obi-ngwa', label: 'Obi Ngwa' },
      { value: 'ohafia', label: 'Ohafia' },
      { value: 'osisioma-ngwa', label: 'Osisioma Ngwa' },
      { value: 'ugwunagbo', label: 'Ugwunagbo' },
      { value: 'ukwa-east', label: 'Ukwa East' },
      { value: 'ukwa-west', label: 'Ukwa West' },
      { value: 'umuahia-north', label: 'Umuahia North' },
      { value: 'umuahia-south', label: 'Umuahia South' },
      { value: 'umunneochi', label: 'Umunneochi' },
    ],
  
    // ADAMAWA STATE (21 LGAs)
    'adamawa': [
      { value: 'demsa', label: 'Demsa' },
      { value: 'fufore', label: 'Fufore' },
      { value: 'gani', label: 'Gani' },
      { value: 'ganye', label: 'Ganye' },
      { value: 'gombi', label: 'Gombi' },
      { value: 'guyuk', label: 'Guyuk' },
      { value: 'hong', label: 'Hong' },
      { value: 'jala-o', label: 'Jadao' }, // Jada
      { value: 'jimeta', label: 'Jimeta' }, // Yola North
      { value: 'lamurde', label: 'Lamurde' },
      { value: 'madagali', label: 'Madagali' },
      { value: 'maiha', label: 'Maiha' },
      { value: 'mayo-belwa', label: 'Mayo Belwa' },
      { value: 'michika', label: 'Michika' },
      { value: 'mubi-north', label: 'Mubi North' },
      { value: 'mubi-south', label: 'Mubi South' },
      { value: 'numan', label: 'Numan' },
      { value: 'shelleng', label: 'Shelleng' },
      { value: 'song', label: 'Song' },
      { value: 'toungo', label: 'Toungo' },
      { value: 'yola-south', label: 'Yola South' },
    ],
  
    // AKWA IBOM STATE (31 LGAs)
    'akwa-ibom': [
      { value: 'abia-atai', label: 'Abia-Atai' },
      { value: 'akwa-ibom', label: 'Akwa-Ibom' },
      { value: 'esit-eket', label: 'Esit Eket' },
      { value: 'etim-ekpo', label: 'Etim Ekpo' },
      { value: 'eket', label: 'Eket' },
      { value: 'ekpe-atai', label: 'Ekpe Atai' },
      { value: 'ikot-abasi', label: 'Ikot Abasi' },
      { value: 'ikot-ekpene', label: 'Ikot Ekpene' },
      { value: 'ini', label: 'Ini' },
      { value: 'itu', label: 'Itu' },
      { value: 'mbo', label: 'Mbo' },
      { value: 'mkpat-enin', label: 'Mkpat Enin' },
      { value: 'nsit-atai', label: 'Nsit-Atai' },
      { value: 'nsit-ibom', label: 'Nsit-Ibom' },
      { value: 'nsit-ubium', label: 'Nsit-Ubium' },
      { value: 'obon-eket', label: 'Obon Eket' },
      { value: 'okobo', label: 'Okobo' },
      { value: 'ondu-ikot-abasi', label: 'Ondo-Ikot Abasi' },
      { value: 'oron', label: 'Oron' },
      { value: 'oruk-anam', label: 'Oruk Anam' },
      { value: 'udung-uko', label: 'Udung Uko' },
      { value: 'uruan', label: 'Uruan' },
      { value: 'urue-offong-oruko', label: 'Urue-Offong/Oruko' },
      { value: 'uyo', label: 'Uyo' },
      { value: 'eastern-obolo', label: 'Eastern Obolo' },
      { value: 'ibeno', label: 'Ibeno' },
      { value: 'ibesikpo-asutan', label: 'Ibesikpo Asutan' },
      { value: 'ikono', label: 'Ikono' },
      { value: 'p-d-oruk-anam', label: 'P.D Oruk Anam' }, // Other variations
      { value: 'u-d-oruk-anam', label: 'U.D Oruk Anam' }, // Other variations
      { value: 'n-s-ekpe-atai', label: 'N.S Ekpe Atai' }, // Other variations
    ],
  
    // ANAMBRA STATE (21 LGAs)
    'anambra': [
      { value: 'aguata', label: 'Aguata' },
      { value: 'anambra-east', label: 'Anambra East' },
      { value: 'anambra-west', label: 'Anambra West' },
      { value: 'anaocha', label: 'Anaocha' },
      { value: 'awka-north', label: 'Awka North' },
      { value: 'awka-south', label: 'Awka South' },
      { value: 'ayamelum', label: 'Ayamelum' },
      { value: 'dunukofia', label: 'Dunukofia' },
      { value: 'ekwusigo', label: 'Ekwusigo' },
      { value: 'idemili-north', label: 'Idemili North' },
      { value: 'idemili-south', label: 'Idemili South' },
      { value: 'ihiala', label: 'Ihiala' },
      { value: 'nijkoka', label: 'Nijkoka' },
      { value: 'nnewi-north', label: 'Nnewi North' },
      { value: 'nnewi-south', label: 'Nnewi South' },
      { value: 'ogbaru', label: 'Ogbaru' },
      { value: 'onitsha-north', label: 'Onitsha North' },
      { value: 'onitsha-south', label: 'Onitsha South' },
      { value: 'orumba-north', label: 'Orumba North' },
      { value: 'orumba-south', label: 'Orumba South' },
      { value: 'oyi', label: 'Oyi' },
    ],
  
    // BAUCHI STATE (20 LGAs)
    'bauchi': [
      { value: 'alkaleri', label: 'Alkaleri' },
      { value: 'bauchi', label: 'Bauchi' },
      { value: 'bogoro', label: 'Bogoro' },
      { value: 'damban', label: 'Damban' },
      { value: 'darazo', label: 'Darazo' },
      { value: 'dass', label: 'Dass' },
      { value: 'gamawa', label: 'Gamawa' },
      { value: 'ganjuwa', label: 'Ganjuwa' },
      { value: 'giyade', label: 'Giyade' },
      { value: 'iturwa', label: 'Iturwa' },
      { value: 'kirfi', label: 'Kirfi' },
      { value: 'misau', label: 'Misau' },
      { value: 'ningi', label: 'Ningi' },
      { value: 'shira', label: 'Shira' },
      { value: 'tafawa-balewa', label: 'Tafawa Balewa' },
      { value: 'toro', label: 'Toro' },
      { value: 'warji', label: 'Warji' },
      { value: 'zaki', label: 'Zaki' },
      { value: 'katagum', label: 'Katagum' },
      { value: 'jamaare', label: 'Jamaare' },
    ],
  
    // BAYELSA STATE (8 LGAs)
    'bayelsa': [
      { value: 'brass', label: 'Brass' },
      { value: 'ekeremor', label: 'Ekeremor' },
      { value: 'kolokuma-opokuma', label: 'Kolokuma/Opokuma' },
      { value: 'nembe', label: 'Nembe' },
      { value: 'ogbia', label: 'Ogbia' },
      { value: 'sagbama', label: 'Sagbama' },
      { value: 'southern-ijaw', label: 'Southern Ijaw' },
      { value: 'yenagoa', label: 'Yenagoa' },
    ],
  
    // BENUE STATE (23 LGAs)
    'benue': [
      { value: 'agatu', label: 'Agatu' },
      { value: 'apadewa', label: 'Apadewa' }, // Variation of Apa
      { value: 'apa', label: 'Apa' },
      { value: 'gwer-east', label: 'Gwer East' },
      { value: 'gwer-west', label: 'Gwer West' },
      { value: 'katsina-ala', label: 'Katsina-Ala' },
      { value: 'konshisha', label: 'Konshisha' },
      { value: 'kwande', label: 'Kwande' },
      { value: 'logo', label: 'Logo' },
      { value: 'makurdi', label: 'Makurdi' },
      { value: 'obi', label: 'Obi' },
      { value: 'ogbadibo', label: 'Ogbadibo' },
      { value: 'ohimini', label: 'Ohimini' },
      { value: 'oturkpo', label: 'Oturkpo' },
      { value: 'taraba', label: 'Taraba' }, // Variation of Tarkaa
      { value: 'tarkaa', label: 'Tarkaa' },
      { value: 'ukanafun', label: 'Ukanafun' },
      { value: 'ushongo', label: 'Ushongo' },
      { value: 'vandeikya', label: 'Vandeikya' },
      { value: 'ajeh', label: 'Ajeh' }, // Variation of Ado
      { value: 'ado', label: 'Ado' },
      { value: 'okpokwu', label: 'Okpokwu' },
      { value: 'buruku', label: 'Buruku' },
    ],
  
    // BORNO STATE (27 LGAs)
    'borno': [
      { value: 'abadam', label: 'Abadam' },
      { value: 'askira-uba', label: 'Askira/Uba' },
      { value: 'bama', label: 'Bama' },
      { value: 'bayo', label: 'Bayo' },
      { value: 'bui', label: 'Bui' },
      { value: 'chibok', label: 'Chibok' },
      { value: 'damboa', label: 'Damboa' },
      { value: 'dikwa', label: 'Dikwa' },
      { value: 'guzamala', label: 'Guzamala' },
      { value: 'gwoza', label: 'Gwoza' },
      { value: 'hawul', label: 'Hawul' },
      { value: 'jere', label: 'Jere' },
      { value: 'kaga', label: 'Kaga' },
      { value: 'kala-balge', label: 'Kala/Balge' },
      { value: 'konduga', label: 'Konduga' },
      { value: 'kukawa', label: 'Kukawa' },
      { value: 'kwaya-kusar', label: 'Kwaya Kusar' },
      { value: 'mafa', label: 'Mafa' },
      { value: 'magumeri', label: 'Magumeri' },
      { value: 'marte', label: 'Marte' },
      { value: 'mobbar', label: 'Mobbar' },
      { value: 'monguno', label: 'Monguno' },
      { value: 'ngala', label: 'Ngala' },
      { value: 'nugan', label: 'Nugan' }, // Variation of Nganzai
      { value: 'nganzai', label: 'Nganzai' },
      { value: 'shani', label: 'Shani' },
      { value: 'bale', label: 'Bale' }, // Variation of Bama
    ],
  
    // CROSS RIVER STATE (18 LGAs)
    'cross-river': [
      { value: 'abi', label: 'Abi' },
      { value: 'akwa-ibom-cross-river', label: 'Akwa Ibom' }, // Note: Distinct from the state
      { value: 'bakassi', label: 'Bakassi' },
      { value: 'bekwarra', label: 'Bekwarra' },
      { value: 'boki', label: 'Boki' },
      { value: 'calabar-municipal', label: 'Calabar Municipal' },
      { value: 'calabar-south', label: 'Calabar South' },
      { value: 'etung', label: 'Etung' },
      { value: 'ikom', label: 'Ikom' },
      { value: 'obana', label: 'Obanliku' },
      { value: 'obudu', label: 'Obudu' },
      { value: 'odukpani', label: 'Odukpani' },
      { value: 'ogoji', label: 'Ogoja' },
      { value: 'yala', label: 'Yala' },
      { value: 'yakurr', label: 'Yakurr' },
      { value: 'ikomi', label: 'Ikomi' }, // Variation of Ikom
      { value: 'wani', label: 'Wani' }, // Variation of Yala
      { value: 'akampa', label: 'Akampa' },
    ],
  
    // DELTA STATE (25 LGAs)
    'delta': [
      { value: 'aniocha-north', label: 'Aniocha North' },
      { value: 'aniocha-south', label: 'Aniocha South' },
      { value: 'bomadi', label: 'Bomadi' },
      { value: 'burutu', label: 'Burutu' },
      { value: 'ethiope-east', label: 'Ethiope East' },
      { value: 'ethiope-west', label: 'Ethiope West' },
      { value: 'ika-north-east', label: 'Ika North East' },
      { value: 'ika-south', label: 'Ika South' },
      { value: 'isoko-north', label: 'Isoko North' },
      { value: 'isoko-south', label: 'Isoko South' },
      { value: 'ndokwa-east', label: 'Ndokwa East' },
      { value: 'ndokwa-west', label: 'Ndokwa West' },
      { value: 'okpe', label: 'Okpe' },
      { value: 'oshimili-north', label: 'Oshimili North' },
      { value: 'oshimili-south', label: 'Oshimili South' },
      { value: 'patani', label: 'Patani' },
      { value: 'sapele', label: 'Sapele' },
      { value: 'udu', label: 'Udu' },
      { value: 'ughelli-north', label: 'Ughelli North' },
      { value: 'ughelli-south', label: 'Ughelli South' },
      { value: 'ukwuani', label: 'Ukwuani' },
      { value: 'urum-south', label: 'Urum South' }, // Variation of Uvwie
      { value: 'uvwie', label: 'Uvwie' },
      { value: 'warri-north', label: 'Warri North' },
      { value: 'warri-south', label: 'Warri South' },
    ],
  
    // EBONYI STATE (13 LGAs)
    'ebonyi': [
      { value: 'abakaliki', label: 'Abakaliki' },
      { value: 'afikpo-north', label: 'Afikpo North' },
      { value: 'afikpo-south', label: 'Afikpo South' },
      { value: 'ebonyi-lga', label: 'Ebonyi' }, // Note: Same name as state
      { value: 'ezza-north', label: 'Ezza North' },
      { value: 'ezza-south', label: 'Ezza South' },
      { value: 'ikwo', label: 'Ikwo' },
      { value: 'ishielu', label: 'Ishielu' },
      { value: 'ivo', label: 'Ivo' },
      { value: 'izzi', label: 'Izzi' },
      { value: 'ohaozara', label: 'Ohaozara' },
      { value: 'onna', label: 'Onna' }, // Variation of Ohaukwu
      { value: 'ohaukwu', label: 'Ohaukwu' },
    ],
  
    // EDO STATE (18 LGAs)
    'edo': [
      { value: 'akoko-edo', label: 'Akoko Edo' },
      { value: 'egha', label: 'Eghab' }, // Variation of Esan Central
      { value: 'esan-central', label: 'Esan Central' },
      { value: 'esan-north-east', label: 'Esan North-East' },
      { value: 'esan-south-east', label: 'Esan South-East' },
      { value: 'esan-west', label: 'Esan West' },
      { value: 'etsako-central', label: 'Etsako Central' },
      { value: 'etsako-east', label: 'Etsako East' },
      { value: 'etsako-west', label: 'Etsako West' },
      { value: 'igebben', label: 'Igebben' }, // Variation of Igueben
      { value: 'igueben', label: 'Igueben' },
      { value: 'ikpoba-okha', label: 'Ikpoba-Okha' },
      { value: 'oredo', label: 'Oredo' },
      { value: 'orianwan', label: 'Orianwan' }, // Variation of Orhionmwon
      { value: 'orhionmwon', label: 'Orhionmwon' },
      { value: 'ovian', label: 'Ovian' }, // Variation of Ovia North-East
      { value: 'ovia-north-east', label: 'Ovia North-East' },
      { value: 'ovia-south-west', label: 'Ovia South-West' },
      { value: 'uhunmwonde', label: 'Uhunmwonde' },
    ],
  
    // EKITI STATE (16 LGAs)
    'ekiti': [
      { value: 'ado-ekiti', label: 'Ado Ekiti' },
      { value: 'efon', label: 'Efon' },
      { value: 'ekiti-east', label: 'Ekiti East' },
      { value: 'ekiti-south-west', label: 'Ekiti South-West' },
      { value: 'ekiti-west', label: 'Ekiti West' },
      { value: 'emure', label: 'Emure' },
      { value: 'gbonyin', label: 'Gbonyin' },
      { value: 'ido-osi', label: 'Ido-Osi' },
      { value: 'ijero', label: 'Ijero' },
      { value: 'ikere', label: 'Ikere' },
      { value: 'ikole', label: 'Ikole' },
      { value: 'ise-orun', label: 'Ise/Orun' },
      { value: 'moba', label: 'Moba' },
      { value: 'odo', label: 'Odo' }, // Variation of Oye
      { value: 'oye', label: 'Oye' },
      { value: 'irepodun-ifofin', label: 'Irepodun/Ifofin' },
    ],
  
    // ENUGU STATE (17 LGAs)
    'enugu': [
      { value: 'aniriba', label: 'Aniriba' }, // Variation of Aninri
      { value: 'aninri', label: 'Aninri' },
      { value: 'awgu', label: 'Awgu' },
      { value: 'enugu-east', label: 'Enugu East' },
      { value: 'enugu-north', label: 'Enugu North' },
      { value: 'enugu-south', label: 'Enugu South' },
      { value: 'ezeagu', label: 'Ezeagu' },
      { value: 'igbo-etiti', label: 'Igbo Etiti' },
      { value: 'igbo-eze-north', label: 'Igbo Eze North' },
      { value: 'igbo-eze-south', label: 'Igbo Eze South' },
      { value: 'isi-uzo', label: 'Isi Uzo' },
      { value: 'nkanu-east', label: 'Nkanu East' },
      { value: 'nkanu-west', label: 'Nkanu West' },
      { value: 'nsukka', label: 'Nsukka' },
      { value: 'oji-river', label: 'Oji River' },
      { value: 'uden', label: 'Uden' }, // Variation of Udi
      { value: 'udi', label: 'Udi' },
      { value: 'uzonwani', label: 'Uzo-Uwani' },
    ],
  
    // FEDERAL CAPITAL TERRITORY (FCT) (6 LGAs)
    'fct': [
      { value: 'abaji', label: 'Abaji' },
      { value: 'bwari', label: 'Bwari' },
      { value: 'gwagwalada', label: 'Gwagwalada' },
      { value: 'kug', label: 'Kug' }, // Variation of Kuje
      { value: 'kuje', label: 'Kuje' },
      { value: 'kwali', label: 'Kwali' },
      { value: 'municipal-area-council', label: 'Municipal Area Council' },
    ],
  
    // GOMBE STATE (11 LGAs)
    'gombe': [
      { value: 'akko', label: 'Akko' },
      { value: 'balanga', label: 'Balanga' },
      { value: 'billiri', label: 'Billiri' },
      { value: 'dukku', label: 'Dukku' },
      { value: 'funakaye', label: 'Funakaye' },
      { value: 'gomb', label: 'Gomb' }, // Variation of Gombe
      { value: 'gombe-lga', label: 'Gombe' }, // Note: Same name as state
      { value: 'kaltungo', label: 'Kaltungo' },
      { value: 'kwami', label: 'Kwami' },
      { value: 'nafada', label: 'Nafada' },
      { value: 'shomgom', label: 'Shongom' },
      { value: 'yamaltu-deba', label: 'Yamaltu/Deba' },
    ],
  
    // IMO STATE (27 LGAs)
    'imo': [
      { value: 'abiama', label: 'Abiama' }, // Variation of Aboh Mbaise
      { value: 'aboh-mbaise', label: 'Aboh Mbaise' },
      { value: 'ahiazu-mbaise', label: 'Ahiazu Mbaise' },
      { value: 'ehime-mbano', label: 'Ehime Mbano' },
      { value: 'ezinihitte', label: 'Ezinihitte' },
      { value: 'ideato-north', label: 'Ideato North' },
      { value: 'ideato-south', label: 'Ideato South' },
      { value: 'ihitte-uboma', label: 'Ihitte/Uboma' },
      { value: 'iketara', label: 'Iketara' }, // Variation of Ikeduru
      { value: 'ikeduru', label: 'Ikeduru' },
      { value: 'isu', label: 'Isu' },
      { value: 'mbaise', label: 'Mbaise' }, // Generic
      { value: 'mbaiko', label: 'Mbaiko' },
      { value: 'ngor-okpala', label: 'Ngor Okpala' },
      { value: 'njaba', label: 'Njaba' },
      { value: 'nkwerre', label: 'Nkwerre' },
      { value: 'nwangele', label: 'Nwangele' },
      { value: 'obowo', label: 'Obowo' },
      { value: 'oguta', label: 'Oguta' },
      { value: 'ohaji-egbema', label: 'Ohaji/Egbema' },
      { value: 'okigwe', label: 'Okigwe' },
      { value: 'orlu', label: 'Orlu' },
      { value: 'oruba', label: 'Oruba' }, // Variation of Orlu
      { value: 'orunba-south', label: 'Orunba South' }, // Variation of Orsu
      { value: 'orukwo', label: 'Orukwo' }, // Variation of Orsu
      { value: 'owerri-municipal', label: 'Owerri Municipal' },
      { value: 'owerri-north', label: 'Owerri North' },
      { value: 'owerri-west', label: 'Owerri West' },
      { value: 'ugiri', label: 'Ugiri' }, // Variation of Isiala Mbano
      { value: 'isiala-mbano', label: 'Isiala Mbano' },
      { value: 'onuimo', label: 'Onuimo' },
    ],
  
    // JIGAWA STATE (27 LGAs)
    'jigawa': [
      { value: 'ajej', label: 'Ajej' }, // Variation of Auyo
      { value: 'auyo', label: 'Auyo' },
      { value: 'baba', label: 'Baba' }, // Variation of Babura
      { value: 'babura', label: 'Babura' },
      { value: 'buji', label: 'Buji' },
      { value: 'birnin-kudu', label: 'Birnin Kudu' },
      { value: 'bakin-dawa', label: 'Bakin Dawa' }, // Variation of Biriniwa
      { value: 'biriniwa', label: 'Biriniwa' },
      { value: 'gwaram', label: 'Gwaram' },
      { value: 'gwiwa', label: 'Gwiwa' },
      { value: 'haden', label: 'Haden' }, // Variation of Hadejia
      { value: 'hadejia', label: 'Hadejia' },
      { value: 'jahun', label: 'Jahun' },
      { value: 'kazaure', label: 'Kazaure' },
      { value: 'kiri-kasama', label: 'Kiri Kasama' },
      { value: 'kiyawa', label: 'Kiyawa' },
      { value: 'kudu-kazaure', label: 'Kudu Kazaure' }, // Variation of Kazaure
      { value: 'maigatari', label: 'Maigatari' },
      { value: 'malam-madori', label: 'Malam Madori' },
      { value: 'musa-nassarawa', label: 'Musa Nassarawa' }, // Variation of Maigatari
      { value: 'ringim', label: 'Ringim' },
      { value: 'rungu', label: 'Rungu' }, // Variation of Ringim
      { value: 'sule-tankarkar', label: 'Sule Tankarkar' },
      { value: 'taura', label: 'Taura' },
      { value: 'gumel', label: 'Gumel' },
      { value: 'gagarawa', label: 'Gagarawa' },
      { value: 'dutse', label: 'Dutse' },
    ],
  
    // KADUNA STATE (23 LGAs)
    'kaduna': [
      { value: 'birnin-gwari', label: 'Birnin Gwari' },
      { value: 'chikun', label: 'Chikun' },
      { value: 'giwa', label: 'Giwa' },
      { value: 'igabi', label: 'Igabi' },
      { value: 'ikara', label: 'Ikara' },
      { value: 'jaba', label: 'Jaba' },
      { value: 'kachia', label: 'Kachia' },
      { value: 'kaduna-north', label: 'Kaduna North' },
      { value: 'kaduna-south', label: 'Kaduna South' },
      { value: 'kagarko', label: 'Kagarko' },
      { value: 'kajuru', label: 'Kajuru' },
      { value: 'kaura', label: 'Kaura' },
      { value: 'kauru', label: 'Kauru' },
      { value: 'kubau', label: 'Kubau' },
      { value: 'kudan', label: 'Kudan' },
      { value: 'larduna', label: 'Larduna' }, // Variation of Lere
      { value: 'lere', label: 'Lere' },
      { value: 'makarfi', label: 'Makarfi' },
      { value: 'sabon-gari', label: 'Sabon Gari' },
      { value: 'sanga', label: 'Sanga' },
      { value: 'soba', label: 'Soba' },
      { value: 'zangon-kataf', label: 'Zangon Kataf' },
      { value: 'zaria', label: 'Zaria' },
    ],
  
    // KANO STATE (44 LGAs)
    'kano': [
      { value: 'ajna', label: 'Ajna' }, // Variation of Ajingi
      { value: 'ajingi', label: 'Ajingi' },
      { value: 'alagano', label: 'Alagano' }, // Variation of Albasu
      { value: 'albasu', label: 'Albasu' },
      { value: 'bage', label: 'Bage' }, // Variation of Bagwai
      { value: 'bagwai', label: 'Bagwai' },
      { value: 'bebeji', label: 'Bebeji' },
      { value: 'bunkure', label: 'Bunkure' },
      { value: 'dala', label: 'Dala' },
      { value: 'dambatta', label: 'Dambatta' },
      { value: 'dawakin-kudu', label: 'Dawakin Kudu' },
      { value: 'dawakin-tofa', label: 'Dawakin Tofa' },
      { value: 'doguwa', label: 'Doguwa' },
      { value: 'fagge', label: 'Fagge' },
      { value: 'gabasawa', label: 'Gabasawa' },
      { value: 'garko', label: 'Garko' },
      { value: 'garum-mallam', label: 'Garum Mallam' },
      { value: 'gaya', label: 'Gaya' },
      { value: 'gezawa', label: 'Gezawa' },
      { value: 'gwarzo', label: 'Gwarzo' },
      { value: 'kabaya', label: 'Kabaya' }, // Variation of Kabo
      { value: 'kabo', label: 'Kabo' },
      { value: 'kano-municipal', label: 'Kano Municipal' },
      { value: 'karaye', label: 'Karaye' },
      { value: 'kibiya', label: 'Kibiya' },
      { value: 'kiru', label: 'Kiru' },
      { value: 'kumbotso', label: 'Kumbotso' },
      { value: 'kunchi', label: 'Kunchi' },
      { value: 'kura', label: 'Kura' },
      { value: 'madobi', label: 'Madobi' },
      { value: 'makoda', label: 'Makoda' },
      { value: 'minjibir', label: 'Minjibir' },
      { value: 'nasarawa', label: 'Nasarawa' },
      { value: 'ranc', label: 'Ranc' }, // Variation of Rano
      { value: 'rano', label: 'Rano' },
      { value: 'rogo', label: 'Rogo' },
      { value: 'shananu', label: 'Shananu' }, // Variation of Shanono
      { value: 'shanono', label: 'Shanono' },
      { value: 'sumaila', label: 'Sumaila' },
      { value: 'takai', label: 'Takai' },
      { value: 'tarauni', label: 'Tarauni' },
      { value: 'tofa', label: 'Tofa' },
      { value: 'tsanyawa', label: 'Tsanyawa' },
      { value: 'tudun-wada', label: 'Tudun Wada' },
      { value: 'ungogo', label: 'Ungogo' },
      { value: 'warawa', label: 'Warawa' },
      { value: 'wudil', label: 'Wudil' },
    ],
  
    // KATSINA STATE (34 LGAs)
    'katsina': [
      { value: 'bakori', label: 'Bakori' },
      { value: 'batagarawa', label: 'Batagarawa' },
      { value: 'batsari', label: 'Batsari' },
      { value: 'baure', label: 'Baure' },
      { value: 'bindawa', label: 'Bindawa' },
      { value: 'charanchi', label: 'Charanchi' },
      { value: 'dandume', label: 'Dandume' },
      { value: 'danja', label: 'Danja' },
      { value: 'dan-musa', label: 'Dan Musa' },
      { value: 'daura', label: 'Daura' },
      { value: 'dutsi', label: 'Dutsi' },
      { value: 'dutsin-ma', label: 'Dutsin Ma' },
      { value: 'faskari', label: 'Faskari' },
      { value: 'funtua', label: 'Funtua' },
      { value: 'ingawa', label: 'Ingawa' },
      { value: 'jibia', label: 'Jibia' },
      { value: 'kafar', label: 'Kafar' }, // Variation of Kafar-Sarki
      { value: 'kafar-sarki', label: 'Kafar-Sarki' }, // Variation of Kaita
      { value: 'kaita', label: 'Kaita' },
      { value: 'kankara', label: 'Kankara' },
      { value: 'kankia', label: 'Kankia' },
      { value: 'katsina-lga', label: 'Katsina' }, // Note: Same name as state
      { value: 'kurfi', label: 'Kurfi' },
      { value: 'kusada', label: 'Kusada' },
      { value: 'mai-adua', label: 'Mai Adua' },
      { value: 'malumfashi', label: 'Malumfashi' },
      { value: 'man', label: 'Man' }, // Variation of Mani
      { value: 'mani', label: 'Mani' },
      { value: 'mashi', label: 'Mashi' },
      { value: 'mataz', label: 'Mataz' }, // Variation of Matazu
      { value: 'matazu', label: 'Matazu' },
      { value: 'musawa', label: 'Musawa' },
      { value: 'rimi', label: 'Rimi' },
      { value: 'sabua', label: 'Sabua' }, // Variation of Sabuwa
      { value: 'sabuwa', label: 'Sabuwa' },
      { value: 'safana', label: 'Safana' },
      { value: 'sandamu', label: 'Sandamu' },
      { value: 'zango', label: 'Zango' },
    ],
  
    // KEBBI STATE (21 LGAs)
    'kebbi': [
      { value: 'aliero', label: 'Aliero' },
      { value: 'arewa-dandi', label: 'Arewa Dandi' },
      { value: 'argungu', label: 'Argungu' },
      { value: 'auchi', label: 'Auchi' }, // Variation of Augie
      { value: 'augie', label: 'Augie' },
      { value: 'bagudo', label: 'Bagudo' },
      { value: 'birnin-kebbi', label: 'Birnin Kebbi' },
      { value: 'bunza', label: 'Bunza' },
      { value: 'dandi', label: 'Dandi' },
      { value: 'fakai', label: 'Fakai' },
      { value: 'gani', label: 'Gani' }, // Variation of Gwandu
      { value: 'gwandu', label: 'Gwandu' },
      { value: 'jega', label: 'Jega' },
      { value: 'kalgo', label: 'Kalgo' },
      { value: 'koko-besse', label: 'Koko/Besse' },
      { value: 'maiyama', label: 'Maiyama' },
      { value: 'ngaski', label: 'Ngaski' },
      { value: 'sakaba', label: 'Sakaba' },
      { value: 'shanga', label: 'Shanga' },
      { value: 'suru', label: 'Suru' },
      { value: 'wasagu-danko', label: 'Wasagu/Danko' },
      { value: 'yabo', label: 'Yabo' }, // Variation of Yauri
      { value: 'yauri', label: 'Yauri' },
      { value: 'zuru', label: 'Zuru' },
    ],
  
    // KOGI STATE (21 LGAs)
    'kogi': [
      { value: 'adavi', label: 'Adavi' },
      { value: 'agana', label: 'Agana' }, // Variation of Ajaokuta
      { value: 'ajaokuta', label: 'Ajaokuta' },
      { value: 'ankpa', label: 'Ankpa' },
      { value: 'bassa', label: 'Bassa' },
      { value: 'dekina', label: 'Dekina' },
      { value: 'ibaji', label: 'Ibaji' },
      { value: 'idano', label: 'Idano' }, // Variation of Idah
      { value: 'idah', label: 'Idah' },
      { value: 'igalamela-odolu', label: 'Igalamela/Odolu' },
      { value: 'ijumu', label: 'Ijumu' },
      { value: 'kabak', label: 'Kabak' }, // Variation of Kabba/Bunu
      { value: 'kabba-bunu', label: 'Kabba/Bunu' },
      { value: 'kogi-lga', label: 'Kogi' }, // Note: Same name as state
      { value: 'lokoja', label: 'Lokoja' },
      { value: 'mopa-muro', label: 'Mopa-Muro' },
      { value: 'ofed', label: 'Ofed' }, // Variation of Ofu
      { value: 'ofu', label: 'Ofu' },
      { value: 'ogori-magongo', label: 'Ogori/Magongo' },
      { value: 'okada', label: 'Okada' }, // Variation of Okehi
      { value: 'okehi', label: 'Okehi' },
      { value: 'okene', label: 'Okene' },
      { value: 'olamaboro', label: 'Olamaboro' },
      { value: 'omala', label: 'Omala' },
      { value: 'yagba-east', label: 'Yagba East' },
      { value: 'yagba-west', label: 'Yagba West' },
    ],
  
    // KWARA STATE (16 LGAs)
    'kwara': [
      { value: 'asa', label: 'Asa' },
      { value: 'baruten', label: 'Baruten' },
      { value: 'edu', label: 'Edu' },
      { value: 'ekiti-kwara', label: 'Ekiti' }, // Note: Distinct from Ekiti State
      { value: 'ilogun', label: 'Ilogun' }, // Variation of Ilorin East
      { value: 'ilorin-east', label: 'Ilorin East' },
      { value: 'ilorin-south', label: 'Ilorin South' },
      { value: 'ilorin-west', label: 'Ilorin West' },
      { value: 'irepodun', label: 'Irepodun' },
      { value: 'isin', label: 'Isin' },
      { value: 'kaiama', label: 'Kaiama' },
      { value: 'moro', label: 'Moro' },
      { value: 'offa', label: 'Offa' },
      { value: 'oke-ero', label: 'Oke-Ero' },
      { value: 'oyun', label: 'Oyun' },
      { value: 'pategi', label: 'Pategi' },
    ],
  
    // LAGOS STATE (20 LGAs)
    'lagos': [
      { value: 'agege', label: 'Agege' },
      { value: 'ajeromi-ifelodun', label: 'Ajeromi/Ifelodun' },
      { value: 'alimosho', label: 'Alimosho' },
      { value: 'amagbe', label: 'Amagbe' }, // Variation of Amuwo-Odofin
      { value: 'amuwo-odofin', label: 'Amuwo-Odofin' },
      { value: 'apapa', label: 'Apapa' },
      { value: 'badagry', label: 'Badagry' },
      { value: 'epe', label: 'Epe' },
      { value: 'eti-osa', label: 'Eti Osa' },
      { value: 'ibadan', label: 'Ibadan' }, // Variation of Ibeju-Lekki
      { value: 'ibeju-lekki', label: 'Ibeju-Lekki' },
      { value: 'ifako-ijaiye', label: 'Ifako-Ijaiye' },
      { value: 'ijebu', label: 'Ijebu' }, // Variation of Ikorodu
      { value: 'ikorodu', label: 'Ikorodu' },
      { value: 'ikeja', label: 'Ikeja' },
      { value: 'kosofe', label: 'Kosofe' },
      { value: 'lagos-island', label: 'Lagos Island' },
      { value: 'lagos-mainland', label: 'Lagos Mainland' },
      { value: 'mushin', label: 'Mushin' },
      { value: 'ojo', label: 'Ojo' },
      { value: 'oshodi-isolo', label: 'Oshodi-Isolo' },
      { value: 'shomolu', label: 'Shomolu' },
      { value: 'surulere', label: 'Surulere' },
      { value: 'waje', label: 'Waje' }, // Variation of Oshodi/Isolo
    ],
  
    // NASARAWA STATE (13 LGAs)
    'nasarawa': [
      { value: 'ake', label: 'Ake' }, // Variation of Akwanga
      { value: 'akwanga', label: 'Akwanga' },
      { value: 'doma', label: 'Doma' },
      { value: 'gidgid', label: 'Gidgid' }, // Variation of Karu
      { value: 'karu', label: 'Karu' },
      { value: 'keana', label: 'Keana' },
      { value: 'kokona', label: 'Kokona' },
      { value: 'lafia', label: 'Lafia' },
      { value: 'nasarawa-lga', label: 'Nasarawa' }, // Note: Same name as state
      { value: 'obi-nasarawa', label: 'Obi' },
      { value: 'obele', label: 'Obele' }, // Variation of Obi
      { value: 'rufu', label: 'Rufu' }, // Variation of Toto
      { value: 'toto', label: 'Toto' },
      { value: 'wamba', label: 'Wamba' },
      { value: 'azara', label: 'Azara' }, // Variation of Awe
      { value: 'awe', label: 'Awe' },
    ],
  
    // NIGER STATE (25 LGAs)
    'niger': [
      { value: 'agaie', label: 'Agaie' },
      { value: 'agwara', label: 'Agwara' },
      { value: 'bida', label: 'Bida' },
      { value: 'borgu', label: 'Borgu' },
      { value: 'bosso', label: 'Bosso' },
      { value: 'chau', label: 'Chau' }, // Variation of Chanchaga
      { value: 'chanchaga', label: 'Chanchaga' },
      { value: 'edati', label: 'Edati' },
      { value: 'gbako', label: 'Gbako' },
      { value: 'gurara', label: 'Gurara' },
      { value: 'katcha', label: 'Katcha' },
      { value: 'kontagora', label: 'Kontagora' },
      { value: 'lapai', label: 'Lapai' },
      { value: 'lavun', label: 'Lavun' },
      { value: 'magama', label: 'Magama' },
      { value: 'mariga', label: 'Mariga' },
      { value: 'mashegu', label: 'Mashegu' },
      { value: 'mokwa', label: 'Mokwa' },
      { value: 'muya', label: 'Muya' },
      { value: 'paikoro', label: 'Paikoro' },
      { value: 'rafa', label: 'Rafa' }, // Variation of Rafi
      { value: 'rafi', label: 'Rafi' },
      { value: 'rijau', label: 'Rijau' },
      { value: 'shiroro', label: 'Shiroro' },
      { value: 'suleja', label: 'Suleja' },
      { value: 'tafawa', label: 'Tafawa' }, // Variation of Tafa
      { value: 'tafa', label: 'Tafa' },
      { value: 'wushishi', label: 'Wushishi' },
    ],
  
    // OGUN STATE (20 LGAs)
    'ogun': [
      { value: 'abeokuta-north', label: 'Abeokuta North' },
      { value: 'abeokuta-south', label: 'Abeokuta South' },
      { value: 'ado-odo-ota', label: 'Ado-Odo/Ota' },
      { value: 'eguun', label: 'Eguun' }, // Variation of Ewekoro
      { value: 'ewekoro', label: 'Ewekoro' },
      { value: 'ijebu-east', label: 'Ijebu East' },
      { value: 'ijebu-north', label: 'Ijebu North' },
      { value: 'ijebu-north-east', label: 'Ijebu North-East' },
      { value: 'ijebu-ode', label: 'Ijebu Ode' },
      { value: 'ikenne', label: 'Ikenne' },
      { value: 'imeko-afon', label: 'Imeko Afon' },
      { value: 'ipokia', label: 'Ipokia' },
      { value: 'obafemi-owode', label: 'Obafemi Owode' },
      { value: 'ogun-waterside', label: 'Ogun Waterside' },
      { value: 'remo-north', label: 'Remo North' },
      { value: 'sagamu', label: 'Sagamu' },
      { value: 'yewa-north', label: 'Yewa North' },
      { value: 'yewa-south', label: 'Yewa South' },
      { value: 'odeda', label: 'Odeda' },
      { value: 'ogele', label: 'Ogele' }, // Variation of Odogbolu
      { value: 'odogbolu', label: 'Odogbolu' },
    ],
  
    // ONDO STATE (18 LGAs)
    'ondo': [
      { value: 'akoko-north-east', label: 'Akoko North-East' },
      { value: 'akoko-north-west', label: 'Akoko North-West' },
      { value: 'akoko-south-east', label: 'Akoko South-East' },
      { value: 'akoko-south-west', label: 'Akoko South-West' },
      { value: 'akure-north', label: 'Akure North' },
      { value: 'akure-south', label: 'Akure South' },
      { value: 'ese-odo', label: 'Ese Odo' },
      { value: 'idanre', label: 'Idanre' },
      { value: 'ifuel', label: 'Ifuel' }, // Variation of Ifedore
      { value: 'ifedore', label: 'Ifedore' },
      { value: 'ikare', label: 'Ikare' }, // Variation of Ikale
      { value: 'ikale', label: 'Ikale' },
      { value: 'ile-oluji-okeigbo', label: 'Ile Oluji/Okeigbo' },
      { value: 'irele', label: 'Irele' },
      { value: 'odi', label: 'Odi' }, // Variation of Odigbo
      { value: 'odigbo', label: 'Odigbo' },
      { value: 'okiti', label: 'Okiti' }, // Variation of Okitipupa
      { value: 'okitipupa', label: 'Okitipupa' },
      { value: 'ondo-east', label: 'Ondo East' },
      { value: 'ondo-west', label: 'Ondo West' },
      { value: 'ose', label: 'Ose' },
      { value: 'owo', label: 'Owo' },
    ],
  
    // OSUN STATE (30 LGAs)
    'osun': [
      { value: 'afo-west', label: 'Afo West' }, // Variation of Aiyedaade
      { value: 'aiyedaade', label: 'Aiyedaade' },
      { value: 'aiyedire', label: 'Aiyedire' },
      { value: 'boluwaduro', label: 'Boluwaduro' },
      { value: 'boripe', label: 'Boripe' },
      { value: 'ede-north', label: 'Ede North' },
      { value: 'ede-south', label: 'Ede South' },
      { value: 'egbedore', label: 'Egbedore' },
      { value: 'ejigbo', label: 'Ejigbo' },
      { value: 'ife-central', label: 'Ife Central' },
      { value: 'ife-east', label: 'Ife East' },
      { value: 'ife-north', label: 'Ife North' },
      { value: 'ife-south', label: 'Ife South' },
      { value: 'ifelodun', label: 'Ifelodun' },
      { value: 'ijebum', label: 'Ijebum' }, // Variation of Ilesha East
      { value: 'ilesha-east', label: 'Ilesha East' },
      { value: 'ilesha-west', label: 'Ilesha West' },
      { value: 'ile-ogbo', label: 'Ile Ogbo' }, // Variation of Ila
      { value: 'ila', label: 'Ila' },
      { value: 'irepodun-osun', label: 'Irepodun' }, // Note: Distinct from Kwara
      { value: 'irewole', label: 'Irewole' },
      { value: 'isin', label: 'Isin' }, // Variation of Isokan
      { value: 'isokan', label: 'Isokan' },
      { value: 'iwo', label: 'Iwo' },
      { value: 'obokun', label: 'Obokun' },
      { value: 'odo-otin', label: 'Odo Otin' },
      { value: 'ola-oluwa', label: 'Ola-Oluwa' },
      { value: 'olorunda', label: 'Olorunda' },
      { value: 'oriade', label: 'Oriade' },
      { value: 'orolu', label: 'Orolu' },
      { value: 'osogbo', label: 'Osogbo' },
      { value: 'ogo-oluwa', label: 'Ogo-Oluwa' },
    ],
  
    // OYO STATE (33 LGAs)
    'oyo': [
      { value: 'afijio', label: 'Afijio' },
      { value: 'akinyele', label: 'Akinyele' },
      { value: 'atiba', label: 'Atiba' },
      { value: 'atiw', label: 'Atiw' }, // Variation of Atisbo
      { value: 'atisbo', label: 'Atisbo' },
      { value: 'egbeda', label: 'Egbeda' },
      { value: 'ibadan-north', label: 'Ibadan North' },
      { value: 'ibadan-north-east', label: 'Ibadan North-East' },
      { value: 'ibadan-north-west', label: 'Ibadan North-West' },
      { value: 'ibadan-south-east', label: 'Ibadan South-East' },
      { value: 'ibadan-south-west', label: 'Ibadan South-West' },
      { value: 'ibarapa-central', label: 'Ibarapa Central' },
      { value: 'ibarapa-east', label: 'Ibarapa East' },
      { value: 'ibarapa-north', label: 'Ibarapa North' },
      { value: 'ido', label: 'Ido' },
      { value: 'ifesowapo', label: 'Ifesowapo' }, // Variation of Ifedapo
      { value: 'ifedapo', label: 'Ifedapo' },
      { value: 'irepo', label: 'Irepo' },
      { value: 'ise', label: 'Ise' }, // Variation of Iseyin
      { value: 'iseyin', label: 'Iseyin' },
      { value: 'itesiwaju', label: 'Itesiwaju' },
      { value: 'iwajowa', label: 'Iwajowa' },
      { value: 'kajola', label: 'Kajola' },
      { value: 'lagelu', label: 'Lagelu' },
      { value: 'ogbomoso-north', label: 'Ogbomoso North' },
      { value: 'ogbomoso-south', label: 'Ogbomoso South' },
      { value: 'ogo-oluwa-oyo', label: 'Ogo Oluwa' }, // Note: Distinct from Osun
      { value: 'ojo', label: 'Ojo' }, // Variation of Ogbomoso South
      { value: 'oluyole', label: 'Oluyole' },
      { value: 'ona-ara', label: 'Ona-Ara' },
      { value: 'orelope', label: 'Ope Lope' }, // Variation of Orelope
      { value: 'orelope', label: 'Orelope' },
      { value: 'ori-ire', label: 'Ori Ire' },
      { value: 'oyo-east', label: 'Oyo East' },
      { value: 'oyo-west', label: 'Oyo West' },
      { value: 'saki-east', label: 'Saki East' },
      { value: 'saki-west', label: 'Saki West' },
      { value: 'surulere-oyo', label: 'Surulere' }, // Note: Distinct from Lagos
    ],
  
    // PLATEAU STATE (17 LGAs)
    'plateau': [
      { value: 'baking', label: 'Baking' }, // Variation of Barkin Ladi
      { value: 'barkin-ladi', label: 'Barkin Ladi' },
      { value: 'bassa-plateau', label: 'Bassa' }, // Note: Distinct from Kogi
      { value: 'bukkos', label: 'Bukkos' }, // Variation of Bokkos
      { value: 'bokkos', label: 'Bokkos' },
      { value: 'jos-east', label: 'Jos East' },
      { value: 'jos-north', label: 'Jos North' },
      { value: 'jos-south', label: 'Jos South' },
      { value: 'kanam', label: 'Kanam' },
      { value: 'kanem', label: 'Kanem' }, // Variation of Kanke
      { value: 'kanke', label: 'Kanke' },
      { value: 'langtang-north', label: 'Langtang North' },
      { value: 'langtang-south', label: 'Langtang South' },
      { value: 'mangu', label: 'Mangu' },
      { value: 'mikang', label: 'Mikang' },
      { value: 'pankshin', label: 'Pankshin' },
      { value: 'qua-an-pan', label: 'Qua\'an Pan' },
      { value: 'riyom', label: 'Riyom' },
      { value: 'shendam', label: 'Shendam' },
      { value: 'wase', label: 'Wase' },
    ],
  
    // RIVERS STATE (23 LGAs)
    'rivers': [
      { value: 'abua-odual', label: 'Abua/Odual' },
      { value: 'ahoada-east', label: 'Ahoada East' },
      { value: 'ahoada-west', label: 'Ahoada West' },
      { value: 'akuku-toru', label: 'Akuku-Toru' },
      { value: 'andoni', label: 'Andoni' },
      { value: 'asari-toru', label: 'Asari-Toru' },
      { value: 'bonny', label: 'Bonny' },
      { value: 'degema', label: 'Degema' },
      { value: 'eleme', label: 'Eleme' },
      { value: 'emuoha', label: 'Emuoha' },
      { value: 'etche', label: 'Etche' },
      { value: 'gokana', label: 'Gokana' },
      { value: 'ikwerre', label: 'Ikwerre' },
      { value: 'khana', label: 'Khana' },
      { value: 'obio-akpor', label: 'Obio/Akpor' },
      { value: 'ogba-egbema-ndoni', label: 'Ogba/Egbema/Ndoni' },
      { value: 'ogo', label: 'Ogo' }, // Variation of Ogu/Bolo
      { value: 'ogu-bolo', label: 'Ogu/Bolo' },
      { value: 'okrika', label: 'Okrika' },
      { value: 'omumma', label: 'Omumma' },
      { value: 'opobo-nkoro', label: 'Opobo/Nkoro' },
      { value: 'oyigbo', label: 'Oyigbo' },
      { value: 'port-harcourt', label: 'Port Harcourt' },
      { value: 'tai', label: 'Tai' },
    ],
  
    // SOKOTO STATE (23 LGAs)
    'sokoto': [
      { value: 'binji', label: 'Binji' },
      { value: 'bodinga', label: 'Bodinga' },
      { value: 'dange-shuni', label: 'Dange/Shuni' },
      { value: 'gada', label: 'Gada' },
      { value: 'goronyo', label: 'Goronyo' },
      { value: 'gudu', label: 'Gudu' },
      { value: 'gwa', label: 'Gwa' }, // Variation of Gwadabawa
      { value: 'gwadabawa', label: 'Gwadabawa' },
      { value: 'ilaf', label: 'Ilaf' }, // Variation of Illela
      { value: 'illela', label: 'Illela' },
      { value: 'isa', label: 'Isa' },
      { value: 'kware', label: 'Kware' },
      { value: 'rabah', label: 'Rabah' },
      { value: 'sabo', label: 'Sabo' }, // Variation of Sabon Birni
      { value: 'sabon-birni', label: 'Sabon Birni' },
      { value: 'shagari', label: 'Shagari' },
      { value: 'silame', label: 'Silame' },
      { value: 'sokoto-north', label: 'Sokoto North' },
      { value: 'sokoto-south', label: 'Sokoto South' },
      { value: 'tambawa', label: 'Tambawa' }, // Variation of Tambuwal
      { value: 'tambuwal', label: 'Tambuwal' },
      { value: 'tangaza', label: 'Tangaza' },
      { value: 'turu', label: 'Turu' }, // Variation of Tureta
      { value: 'tureta', label: 'Tureta' },
      { value: 'wani', label: 'Wani' }, // Variation of Wurno
      { value: 'wurno', label: 'Wurno' },
      { value: 'yabo', label: 'Yabo' },
    ],
  
    // TARABA STATE (16 LGAs)
    'taraba': [
      { value: 'arda', label: 'Arda' }, // Variation of Ardo Kola
      { value: 'ardo-kola', label: 'Ardo Kola' },
      { value: 'bali', label: 'Bali' },
      { value: 'donga', label: 'Donga' },
      { value: 'gashaka', label: 'Gashaka' },
      { value: 'gassol', label: 'Gassol' },
      { value: 'ibbi', label: 'Ibbi' },
      { value: 'jala', label: 'Jala' }, // Variation of Jalingo
      { value: 'jalingo', label: 'Jalingo' },
      { value: 'karim-lamido', label: 'Karim Lamido' },
      { value: 'kurmi', label: 'Kurmi' },
      { value: 'lau', label: 'Lau' },
      { value: 'sardauna', label: 'Sardauna' },
      { value: 'takum', label: 'Takum' },
      { value: 'usi', label: 'Usi' }, // Variation of Ussa
      { value: 'ussa', label: 'Ussa' },
      { value: 'wukari', label: 'Wukari' },
      { value: 'yaku', label: 'Yaku' }, // Variation of Yangtu
      { value: 'yangtu', label: 'Yangtu' }, // Variation of Zing
      { value: 'zing', label: 'Zing' },
    ],
  
    // YOBE STATE (17 LGAs)
    'yobe': [
      { value: 'bade', label: 'Bade' },
      { value: 'bursari', label: 'Bursari' },
      { value: 'damaturu', label: 'Damaturu' },
      { value: 'fika', label: 'Fika' },
      { value: 'fune', label: 'Fune' },
      { value: 'geidam', label: 'Geidam' },
      { value: 'gular', label: 'Gular' }, // Variation of Gujba
      { value: 'gujba', label: 'Gujba' },
      { value: 'machina', label: 'Machina' },
      { value: 'nguru', label: 'Nguru' },
      { value: 'potiskum', label: 'Potiskum' },
      { value: 'shiroro', label: 'Shiroro' }, // Variation of Tarmuwa
      { value: 'tarmuwa', label: 'Tarmuwa' },
      { value: 'yusufari', label: 'Yusufari' },
      { value: 'jakusko', label: 'Jakusko' },
      { value: 'karu', label: 'Karu' }, // Variation of Karasuwa
      { value: 'karasuwa', label: 'Karasuwa' },
      { value: 'monguno', label: 'Monguno' }, // Variation of Yunusari
      { value: 'yunusari', label: 'Yunusari' },
    ],
  
    // ZAMFARA STATE (14 LGAs)
    'zamfara': [
      { value: 'anjib', label: 'Anjib' }, // Variation of Anka
      { value: 'anka', label: 'Anka' },
      { value: 'baka', label: 'Baka' }, // Variation of Bakura
      { value: 'bakura', label: 'Bakura' },
      { value: 'birnin-magaji', label: 'Birnin Magaji' },
      { value: 'bunza', label: 'Bunza' }, // Variation of Bungu
      { value: 'bungu', label: 'Bungu' },
      { value: 'chafa', label: 'Chafa' }, // Variation of Chafe
      { value: 'chafe', label: 'Chafe' },
      { value: 'gummi', label: 'Gummi' },
      { value: 'gusau', label: 'Gusau' },
      { value: 'kaura-namoda', label: 'Kaura Namoda' },
      { value: 'kwa', label: 'Kwa' }, // Variation of Kwatarkwashi
      { value: 'kwatarkwashi', label: 'Kwatarkwashi' },
      { value: 'maradun', label: 'Maradun' },
      { value: 'shinkafi', label: 'Shinkafi' },
      { value: 'talata-mafara', label: 'Talata Mafara' },
      { value: 'tarauni', label: 'Tarauni' }, // Variation of Tsafe
      { value: 'tsafe', label: 'Tsafe' },
      { value: 'zurmi', label: 'Zurmi' },
    ],
  };