import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { createContext, useEffect, useState } from "react";
import { Alert, Keyboard } from "react-native";
export const AppContext = createContext();
export function AppProvider({ children }) {
  const dummyFlashCards = [
    {
      answer:
        "The science of biogenic or nature-derived pharmaceuticals and poisons. It deals with medicinal plants, crude herbs, extracts (phytotherapy), pure compounds, and nutraceuticals.",
      question: "What is Pharmacognosy?",
    },
    {
      answer:
        "The chemistry and biology of natural products found in terrestrial and marine organisms (plants, animals, or microbes).",
      question: "What is the current definition of Pharmacognosy?",
    },
    {
      answer:
        "Derived from Greek 'pharmakon' (remedy) and 'gignosco' (knowledge).",
      question: "What is the literal meaning of Pharmacognosy?",
    },
    {
      answer:
        "For centuries, the history of pharmacy was identical to that of pharmacognosy, focusing on materia medica from natural sources (plants, minerals, animals, fungi).",
      question:
        "What is the historical relationship between pharmacy and pharmacognosy?",
    },
    {
      answer:
        "Pollen grains of eight spices (yarrow, marshmallow, groundsel, centaury, ephedra, muscari) found at a Neanderthal burial site (around 60,000 BC).",
      question:
        "Mention some earliest archeological findings related to Pharmacognosy.",
    },
    {
      answer:
        "Ancient Egyptians (3000 BC) were experts in using drugs from vegetable origin (Aloes, Gum, Myrrh, Poppy, etc.) for curing diseases. Priest-doctors and pharmacists ('Sons') prescribed and prepared medicines.",
      question: "Describe the role of ancient Egyptians in Pharmacognosy.",
    },
    {
      answer:
        "Found in Egypt in the 1870s, it contains prescriptions for over seven hundred remedies written in hieroglyphics.",
      question: "What is the significance of the Ebers Papyrus?",
    },
    {
      answer:
        "Pedanius Dioscorides (1 BC) described more than 600 medicinal plants and his work influenced European pharmacy for over 1500 years.",
      question:
        "Who is considered the 'father of [Western] medicine', and what was their contribution to Pharmacognosy?",
    },
    {
      answer:
        "Hippocrates (460-375 BC) used simple natural remedies. Theophratus (340 BC) wrote about medicinal plants, their uses, cultivation, and other observations in 'De Historia Plantarum' and 'De Causis Plantarum'.",
      question:
        "Mention the contributions of Hippocrates and Theophratus to Pharmacognosy.",
    },
    {
      answer:
        "Claudius Galen (130–201 AD) summarized Graeco-Roman pharmacy and medicine, and the term 'galenical' originates from his name.",
      question:
        "What is the significance of Claudius Galen's work in Pharmacognosy?",
    },
    {
      answer:
        "He produced a detailed account of natural history, including cosmology, mineralogy, botany, zoology, and medicinal products derived from plants and animals.",
      question:
        "What is Pliny the Elder known for in the context of Pharmacognosy?",
    },
    {
      answer:
        "Written documents on medicinal plants are essential elements of Asian cultures.  In China, pharmacognosy developed within Taoist thought, aiming for longevity through meditation, diet, medicinal plants, etc. The 'Shennongbencaojing' (2200 years old) is a significant work in this tradition.",
      question:
        "Discuss the role of Classical Chinese Records in Pharmacognosy.",
    },
    {
      answer:
        "Knowledge of plant-derived drugs expanded.  In the early 19th century, it became clear that pharmaceutical properties are due to specific molecules that can be isolated and characterized, leading to the development of natural product chemistry and phytochemistry.",
      question:
        "Describe the development of European Pharmacognosy and Natural Product Chemistry in the 18th and 19th centuries.",
    },
    {
      answer:
        "Morphine from opium poppy (isolated by Sertürner in 1804), and quinine from Cinchona bark (isolated by Caventou and Pelletier).",
      question: "Give examples of early pure drugs isolated and characterized.",
    },
    {
      answer:
        "Identifying biological sources of drugs and assessing the efficacy and safety of herbal drugs or their constituents using scientific methods.",
      question: "What are the traditional scopes of Pharmacognosy?",
    },
    {
      answer:
        "Securing regular supply of natural products (cultivation, increasing yield, semi-synthesis, synthesis), and incorporating natural products into modern medicine (phytomedicine, pure compounds).",
      question: "What are the modern concepts in Pharmacognosy?",
    },
    {
      answer:
        "Harvested and usually dried plant or animal sources of pharmaceutically or medicinally useful products before extensive processing.",
      question: "Define crude drugs.",
    },
    {
      answer: "Plant, animal, marine, and mineral kingdoms.",
      question: "List the sources of crude drugs.",
    },
    {
      answer:
        "1. Serve as useful natural drugs. 2. Provide less toxic and more effective drug molecules (lead drugs). 3. Exploration of biologically active prototypes for newer synthetic drugs. 4. Modification of inactive natural products into potent drugs.",
      question:
        "What are the four vital roles of natural drug substances in modern medicine?",
    },
    {
      answer:
        "Natural/biological origin (plant or animal) and geographical origin.",
      question: "What are the two origins of each drug?",
    },
    {
      answer:
        "A system (founded by Linnaeus) for naming organisms using two names: the genus (capitalized) and species (lowercase).  It's often followed by the author's name.",
      question: "Explain binomial nomenclature.",
    },
    {
      answer:
        "Suitability of the plant to a particular environment and economic factors associated with drug production in a specific area.",
      question:
        "What factors determine the commercial geographical sources of a drug?",
    },
    {
      answer:
        "Alphabetical, taxonomic, morphological, pharmacological, chemical, and chemotaxonomic.",
      question: "List different methods of crude drug classification.",
    },
    {
      answer:
        "Official drugs are listed in pharmacopoeias; unofficial drugs are not.",
      question: "Differentiate between official and unofficial drugs.",
    },
    {
      answer:
        "Evaluation using the senses (macroscopic appearance, odor, taste, touch).",
      question: "Describe organoleptic evaluation of crude drugs.",
    },
    {
      answer:
        "Using a microscope to identify powdered drugs and detect adulterants; involves histology (tissue character and arrangement).",
      question: "What is microscopic evaluation of crude drugs?",
    },
    {
      answer:
        "Using chemical tests to identify and ascertain the purity of drugs (e.g., Cascara test with NH3).",
      question: "Explain chemical evaluation of crude drugs.",
    },
    {
      answer:
        "Using physical constants like specific gravity, elasticity, color (e.g., alkaloids), fluorescence, solubility, etc.",
      question: "Explain physical evaluation of crude drugs.",
    },
    {
      answer:
        "1. Selection of plant material. 2. Collection and identification. 3. Selection of an extraction method and solvent. 4. Extraction. 5. Phytochemical analysis.",
      question: "List the steps involved in phytochemical screening.",
    },
    {
      answer:
        "Traditional ethnomedical uses, chemotaxonomical data, specific pharmacological activity, literature review.",
      question:
        "What are some factors to consider while choosing a plant for further study in phytochemical screening?",
    },
    {
      answer:
        "Solvents should be chosen based on the polarity of the target compounds (polar solvents for polar compounds, non-polar for non-polar).",
      question:
        "Explain the principle of 'like extracts like' in solvent selection.",
    },
    {
      answer:
        "Maceration, percolation, Soxhlet extraction, ultrasound extraction, supercritical fluid extraction, extraction under reflux, steam distillation, infusion, decoction.",
      question: "Describe different general methods of extraction.",
    },
    {
      answer:
        "Primary metabolism involves fundamental pathways for energy and building blocks; secondary metabolism produces specialized molecules with specific functions (defense, attraction, coloring).",
      question: "Differentiate between primary and secondary metabolism.",
    },
    {
      answer:
        "Acetate-malonate pathway, mevalonic acid pathway, shikimic acid pathway.",
      question: "List the major pathways for secondary metabolite synthesis.",
    },
    {
      answer:
        "Physiological variations, seasonal variation, type of plant material, environmental conditions, geographic variation, genetic factors, storage.",
      question: "List factors affecting the content of secondary metabolites.",
    },
    {
      answer:
        "Separating a crude extract into fractions containing compounds of similar polarities or molecular sizes.",
      question: "What is fractionation in natural product isolation?",
    },
    {
      answer:
        "Obtaining the active compound(s) from a crude extract or fractions.",
      question: "What is isolation in natural product isolation?",
    },
    {
      answer:
        "Solubility, acid-base properties, charge, stability, molecular size.",
      question: "List the general features of a molecule helpful in isolation.",
    },
    {
      answer:
        "Classical methods (precipitation, fractional distillation) are economical but time-consuming and achieve only partial separation. Modern methods (chromatography) offer better resolution.",
      question: "Compare classical and modern methods of isolation.",
    },
    {
      answer:
        "A technique for separating mixtures into their components using a stationary and a mobile phase.",
      question: "What is chromatography?",
    },
    {
      answer:
        "Stationary phase (retards solute movement) and mobile phase (moves solutes).",
      question: "What are the components of chromatography?",
    },
    {
      answer:
        "Adsorption (affinity for sorbent), partition (solubility in phases), size inclusion/exclusion (molecular size), ion exchange (charge).",
      question: "Explain the mechanisms of chromatographic separation.",
    },
    {
      answer:
        "A liquid chromatography technique using a mobile phase and a stationary phase (coated plate).  Separation is based on the Rf value.",
      question: "Describe thin-layer chromatography (TLC).",
    },
    {
      answer:
        "The ratio of the distance moved by a compound to the distance moved by the solvent front in TLC.",
      question: "What is the Rf value?",
    },
    {
      answer:
        "A chromatography technique using a packed column with a stationary phase. The mobile phase passes through the column, separating compounds based on their interactions with the stationary phase.",
      question: "Describe column chromatography (CC).",
    },
    {
      answer:
        "A chromatography technique where the mobile phase is a carrier gas, used for volatile compounds. Detection methods include flame ionization, thermal conductivity, and mass spectrometry.",
      question: "Describe gas chromatography (GC).",
    },
    {
      answer:
        "A column chromatography technique using high pressure to move the mobile phase.  Separation mechanisms can be adsorption, partition, ion exchange, or size exclusion. Reverse-phase HPLC is common.",
      question: "Describe high-performance liquid chromatography (HPLC).",
    },
    {
      answer:
        "UV-vis (chromophores), IR (functional groups), MS (molecular mass, formula, fragmentation), NMR (protons, carbons, relationships).",
      question:
        "List spectroscopic techniques used for structural elucidation.",
    },
    {
      answer:
        "One-dimensional (1H NMR, 13C NMR, DEPT) and two-dimensional (H-H COSY, H-HMBC).",
      question: "What are the two major categories of NMR experiments?",
    },
  ];

  // useEffect(function(){
  //   async function deleteAllFlashcards(){
  //     await AsyncStorage.removeItem("flashcards")
  //   }
  //   deleteAllFlashcards()
  // },[])

  // useEffect(function () {
  //   async function removeUser(){
  //     await AsyncStorage.removeItem("current-user")
  //   }
  //   removeUser()
  // }, []);

  const [error, setError] = useState("");
  const navigation = useNavigation();
  const ip = "https://studymateapi.onrender.com";
  const localip = "http://192.168.0.110:6969";
  const [allFlashCards, setAllFlashCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [refresh, setRefresh] = useState(0);
  const [signingUp, setSigningUp] = useState(false);
  const [loggingin, setLoggingIn] = useState(false);
  const [flashCardsLoading, setFlashCardsLoading] = useState(false);

  // useEffect(

  //     loadFlashCards();
  //   },
  //   [setRefresh]
  // );

  const loadFlashCards = async () => {
    setFlashCardsLoading(true);
    console.log("Loading FlashCards");
    const loggedInUser = await AsyncStorage.getItem("current-user");
    if (!loggedInUser) return;
    let wantedUser = JSON.parse(loggedInUser).id;
    const res = await fetch(`${ip}/generate/flashcards/${wantedUser}`);
    const data = await res.json();
    if (data.status === "fail") {
      console.log("Failed to load flashcards");
      setFlashCardsLoading(false);
      return;
    }
    setAllFlashCards(data.data);
    console.log("FlashCards Loaded");
    setFlashCardsLoading(false);
  };

  useEffect(function () {
    const loadUser = async () => {
      const user = await AsyncStorage.getItem("current-user");
      if (!user) return;
      setCurrentUser(JSON.parse(user));
    };
    loadUser();
  }, []);

  async function signUp(name, email, pwd) {
    Keyboard.dismiss();
    setSigningUp(true);
    if (!name || !email || !pwd) {
      console.log("Fill all the required fields");
      setSigningUp(false);
      return;
    }
    if (pwd.length < 8) {
      setSigningUp(false);
      setError("Password should be of 8 characters or more");
      return;
    }
    const res = await fetch(`${ip}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        pwd,
      }),
    });
    if (!res.ok) {
      console.log("Something Went Wrong. Try Again Later");
      Alert.alert("Something Went Wrong.", "An error occured when trying to sign up.")
      setSigningUp(false);
      return;
    }
    const data = await res.json();
    if (data.status === "fail") {
      setError(data.message);
      console.log(data.message);
      setSigningUp(false);
      return;
    }
    setError("");
    await AsyncStorage.setItem("current-user", JSON.stringify(data.message[0]));
    setCurrentUser(data.data)
    navigation.navigate("Main");
    console.log("Account Created");
    setSigningUp(false);
  }

  async function logIn(email, pwd) {
    setLoggingIn(true);
    Keyboard.dismiss();
    if (!email || !pwd) {
      console.log("Fill all the required fields");
      setLoggingIn(false);
      return;
    }
    const res = await fetch(`${ip}/auth/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        pwd,
      }),
    });
    if (!res.ok) {
      console.log("Something Went Wrong. Try Again Later");
      Alert.alert("Something Went Wrong.", "An error occured when trying to log in.")
      setLoggingIn(false);
      return;
    }
    const data = await res.json();
    if (data.status === "fail") {
      setLoggingIn(false);
      setError(data.message);
      console.log(data.message);
      return;
    }
    console.log(data.data.id);
    setError("");
    setCurrentUser(data.data)
    await AsyncStorage.setItem("current-user", JSON.stringify(data.data));
    console.log("Logged In Successfully");
    setLoggingIn(false);
    navigation.navigate("Main");
  }

  const value = {
    dummyFlashCards,
    signUp,
    signingUp,
    logIn,
    loggingin,
    error,
    setError,
    ip,
    localip,
    allFlashCards,
    setAllFlashCards,
    currentUser,
    setRefresh,
    loadFlashCards,
    flashCardsLoading,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
