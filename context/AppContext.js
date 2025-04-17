import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { createContext, useEffect, useState } from "react";
import { Alert, BackHandler, Keyboard } from "react-native";
import * as DocumentPicker from "expo-document-picker";
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
  const dummyQuestions = {
    questions: {
      trueFalse: [
        { question: "Tannins are nitrogenous plant products.", answer: false },
        {
          question: "Tannins are soluble in most organic solvents.",
          answer: false,
        },
        {
          question:
            "A positive Goldbeater's skin test indicates the presence of tannins.",
          answer: true,
        },
        {
          question:
            "Condensed tannins give a blue-black precipitate with ferric salts.",
          answer: false,
        },
        {
          question:
            "Hydrolyzable tannins are esters of sugars and phenolic acid molecules.",
          answer: true,
        },
        { question: "Phenazone test precipitates all tannins.", answer: true },
        {
          question: "Pseudotannins give a positive Goldbeater's skin test.",
          answer: false,
        },
        { question: "Myrobalan contains condensed tannins.", answer: false },
        {
          question: "Nutgalls are a major source of tannic acid.",
          answer: true,
        },
        {
          question: "Pale Catechu contains only condensed tannins.",
          answer: false,
        },
      ],
      multipleChoice: [
        {
          question: "What is the molecular weight range of tannins?",
          options: ["50-500", "500-20000", "20000-100000", "100000+"],
          answer: [
            1,
            "Tannins have a molecular weight between 500 and over 20000.",
          ],
        },
        {
          question: "Which test uses goldbeater's skin?",
          options: [
            "Phenazone Test",
            "Gelatin Test",
            "Bromine water test",
            "Goldbeater's skin test",
          ],
          answer: [3, "Goldbeater's skin test utilizes goldbeater's skin."],
        },
        {
          question:
            "What color precipitate do gallitannins give with ferric salts?",
          options: ["Brownish-green", "Blue-black", "Red", "No precipitate"],
          answer: [
            1,
            "Gallitannins produce a blue-black precipitate with ferric salts.",
          ],
        },
        {
          question:
            "Which type of tannin yields catechol derivatives on dry distillation?",
          options: [
            "Hydrolyzable tannins",
            "Condensed tannins",
            "Pseudotannins",
            "All of the above",
          ],
          answer: [
            1,
            "Condensed tannins yield catechol derivatives upon dry distillation.",
          ],
        },
        {
          question: "What is a medicinal use of tannins?",
          options: [
            "Ink manufacture",
            "Leather tanning",
            "Astringent",
            "Dyeing fabrics",
          ],
          answer: [2, "Tannins are used medicinally as astringents."],
        },
        {
          question: "Which of these is a pseudotannin?",
          options: [
            "Tannic acid",
            "Gallotannic acid",
            "Chebulinic acid",
            "Catechin",
          ],
          answer: [3, "Catechin is an example of a pseudotannin."],
        },
        {
          question: "Myrobalan is used for:",
          options: [
            "Dyeing fabrics",
            "Tanning leather",
            "Treating chronic ulcers",
            "Manufacturing ink",
          ],
          answer: [2, "Myrobalan is used externally to treat chronic ulcers."],
        },
        {
          question: "What is the main tannin in nutgalls?",
          options: [
            "Chebulinic acid",
            "Gallotannic acid",
            "Ellagic acid",
            "Catechin",
          ],
          answer: [1, "Nutgalls primarily contain gallotannic acid."],
        },
        {
          question: "Pomegranate rind is used to treat:",
          options: [
            "Chronic ulcers",
            "Non-specific diarrhea",
            "Heavy metal toxicity",
            "Alkaloid poisoning",
          ],
          answer: [
            1,
            "Pomegranate rind is used as a remedy for non-specific diarrhea.",
          ],
        },
        {
          question: "Pale Catechu is obtained from:",
          options: [
            "Acacia catechu",
            "Quercus infectoria",
            "Uncaria gambier",
            "Terminalia chebula",
          ],
          answer: [2, "Pale Catechu is derived from Uncaria gambier."],
        },
        {
          question: "Black Catechu is used as a(n):",
          options: ["Antiseptic", "Antidote", "Astringent", "Haemostatic"],
          answer: [2, "Black Catechu serves as an astringent."],
        },
        {
          question: "Which of these is a hydrolysable tannin?",
          options: [
            "Catechin",
            "Chlorogenic acid",
            "Gallotannic acid",
            "Cutch",
          ],
          answer: [2, "Gallotannic acid is a type of hydrolysable tannin."],
        },
        {
          question:
            "What is formed when condensed tannins are treated with acids or enzymes?",
          options: [
            "Pyrogallol derivatives",
            "Phlobaphenes",
            "Catechol derivatives",
            "Ellagic acid",
          ],
          answer: [
            1,
            "Phlobaphenes are produced when condensed tannins are treated with acids or enzymes.",
          ],
        },
        {
          question:
            "Which compound gives a bulky, colored precipitate in the phenazone test?",
          options: [
            "Only condensed tannins",
            "Only hydrolysable tannins",
            "All tannins",
            "Pseudotannins",
          ],
          answer: [2, "The phenazone test precipitates all types of tannins."],
        },
        {
          question:
            "What color does a solution of hydrolysable tannins produce with ferric chloride?",
          options: ["Green", "Brown", "Blue", "Red"],
          answer: [
            2,
            "Hydrolysable tannins solutions turn blue when mixed with ferric chloride.",
          ],
        },
      ],
    },
    nums: [10, 15],
  };

  const [error, setError] = useState("");
  const navigation = useNavigation();
  const localip = "http://192.168.0.110:6969";
  // const ip = "https://studymate.keabafrica.com";
  const ip = localip;
  const [allFlashCards, setAllFlashCards] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [refresh, setRefresh] = useState(0);
  const [signingUp, setSigningUp] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);
  const [flashCardsLoading, setFlashCardsLoading] = useState(false);
  const [deletingFlashCard, setDeletingFlashCard] = useState(false);
  const [deletingQuestion, setDeletingQuestion] = useState(false);
  const [verificationCode, setVerificationCode] = useState(null);
  const [verificationModalVisible, setVerificationModalVisible] =
    useState(false);
  const [loadingSummaries, setLoadingSummaries] = useState(false);
  const [summaries, setSummaries] = useState([]);
  const [creatingSummary, setCreatingSummary] = useState(false);
  const [question, setQuestion] = useState("");
  const [allConversations, setAllConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState({});
  const [fetchingConversation, setFetchingConversation] = useState(false);
  const [awaitingAnswer, setAwaitingAnswer] = useState(false);
  const [deletingConversation, setDeletingConversation] = useState(false);

  const verifyUser = async () => {
    console.log("Started Verification...");
    const savedUser = await AsyncStorage.getItem("current-user");
    if (!savedUser) {
      navigation.navigate("Sign Up");
      return;
    }
    const parsedUser = JSON.parse(savedUser);
    const res = await fetch(`${ip}/auth/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: parsedUser.email,
        password: parsedUser.pwd,
      }),
    });
    if (!res.ok) {
      Alert.alert("Error", "Something Went Wrong. Try again later");
      BackHandler.exitApp();
      return;
    }
    const data = await res.json();
    if (data.status === "fail") {
      await AsyncStorage.removeItem("current-user");
      navigation.navigate("Sign Up");
      return;
    } else if (data.status === "success") {
      setCurrentUser(data.data);
      await AsyncStorage.setItem("current-user", JSON.stringify(data.data));
      navigation.navigate("Main");
    }
    console.log("Verification Ended");
  };

  const getVerificationCode = async (email) => {
    setSigningUp(true);
    const res = await fetch(`${ip}/auth/verificationemail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });
    const data = await res.json();
    if (data.status === "fail") {
      Alert.alert("Error", data.message);
      setSigningUp(false);
      return;
    }
    await AsyncStorage.setItem(
      "verification",
      JSON.stringify(data.verificationCode)
    );
    setVerificationModalVisible(true);
    // setSigningUp(false)
  };

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
      Alert.alert(
        "Something Went Wrong.",
        "An error occured when trying to sign up."
      );
      setSigningUp(false);
      return;
    }
    const data = await res.json();
    if (data.status === "fail") {
      setError(data.message);
      setSigningUp(false);
      return;
    }
    setError("");
    await AsyncStorage.setItem("current-user", JSON.stringify(data.message[0]));
    setCurrentUser(data.message[0]);
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
      Alert.alert(
        "Something Went Wrong.",
        "An error occured when trying to log in."
      );
      setLoggingIn(false);
      return;
    }
    const data = await res.json();
    if (data.status === "fail") {
      setLoggingIn(false);
      setError(data.message);
      return;
    }
    setError("");
    setCurrentUser(data.data);
    await AsyncStorage.setItem("current-user", JSON.stringify(data.data));
    setLoggingIn(false);
    navigation.navigate("Main");
  }

  const logOut = async () => {
    const currUser = await AsyncStorage.getItem("current-user");
    if (!currUser) {
      return;
    }
    await AsyncStorage.removeItem("current-user");
    setCurrentUser({});
    navigation.navigate("Log In");
  };

  const deleteFlashcard = async (id) => {
    if (deletingFlashCard) return;
    console.log("Delete started");
    if (!id) {
      Alert.alert("Error", "Flashcard ID not provided");
      return;
    }
    setDeletingFlashCard(true);
    const res = await fetch(`${ip}/generate/flashcards/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      Alert.alert("", "Failed to Delete...");
      setDeletingFlashCard(false);
      return;
    }
    const data = await res.json();
    if (data.status === "fail") {
      Alert.alert("", data.message);
      setDeletingFlashCard(false);
      return;
    }
    setAllFlashCards((prev) => {
      return prev.filter((flashcard) => {
        return flashcard.id !== id;
      });
    });
    // Alert.alert("", "Deleted Successfully")
    setDeletingFlashCard(false);
    // navigation.goBack();
  };

  const deleteQuestion = async (id) => {
    setDeletingQuestion(true);
    const res = await fetch(`${ip}/generate/questions/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      Alert.alert("", "Failed to Delete...");
      setDeletingQuestion(false);
      return;
    }
    const data = await res.json();
    if (data.status === "fail") {
      Alert.alert("", data.message);
      setDeletingQuestion(false);
      return;
    }
    setAllQuestions((prev) => {
      return prev.filter((question) => {
        return question.id !== id;
      });
    });
    setDeletingQuestion(false);
    navigation.goBack();
  };

  const getUserSummaries = async () => {
    setLoadingSummaries(true);
    console.log("Fetching Summaries");
    const currUser = await AsyncStorage.getItem("current-user");
    if (!currUser) {
      console.log("Couldn't find user");
      return;
    }
    const parsedUser = JSON.parse(currUser);
    const res = await fetch(`${ip}/conversation/${parsedUser.id}`);
    const data = await res.json();
    console.log("Summaries Fetched");
    setSummaries(data.data.conversations);
    setLoadingSummaries(false);
  };

  const createNewSummary = async () => {
    const file = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      multiple: false,
    });
    if (!file.assets) {
      console.log("No File Selected");
      return;
    }
    console.log("File Selected");
    const loggedInUser = await AsyncStorage.getItem("current-user");
    if (!loggedInUser) {
      console.log("No user ID found");
      return;
    }
    const parsedUser = JSON.parse(loggedInUser);
    const formData = new FormData();
    formData.append("convoFile", {
      uri: file.assets[0].uri,
      type: file.assets[0].mimeType,
      name: file.assets[0].name,
    });
    formData.append("id", parsedUser.id);
    console.log("Generating Conversation");
    setCreatingSummary(true);
    const res = await fetch(`${ip}/conversation`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });
    if (!res.ok) {
      setCreatingSummary(false);
      Alert.alert("Error", "Something went wrong. Please try again.");
      return;
    }
    const data = await res.json();
    setCreatingSummary(false);
    setSummaries((sums) => [...sums, data.data.conversation]);
  };

  const sendQuestionAndReceiveAnswer = async (id) => {
    if (awaitingAnswer) {
      return;
    }
    setQuestion("");
    Keyboard.dismiss();
    setAwaitingAnswer(true);
    if (question === "") {
      return;
    }
    console.log(2);
    const recentQuestion = {
      text: question,
      sender: "user",
    };
    setAllConversations((conversations) => [...conversations, recentQuestion]);
    console.log(3);
    setQuestion("");
    console.log("Sent the Question");
    const res = await fetch(`${ip}/conversation`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: question,
        convoId: id,
      }),
    });
    console.log(4);
    if (!res.ok) {
      Alert.alert("Error", "Something Went Wrong. Please Try Again Later.");
      setAwaitingAnswer(false);
    }
    console.log(5);
    const data = await res.json();
    if (data.status === "fail") {
      Alert.alert("Error", "Sending Question Failed");
      setAwaitingAnswer(false);
      return;
    }
    console.log("Done");

    const updatedConversations = JSON.parse(
      data.data.conversation.conversations
    );
    setAwaitingAnswer(false);
    setAllConversations(updatedConversations);
  };

  const getCurrentConversation = async (id) => {
    setFetchingConversation(true);
    console.log("The conversation ID is ", id);
    const res = await fetch(`${ip}/conversation/currentconversation/${id}`);
    if (!res.ok) {
      console.log("Faulty response");
      setFetchingConversation(false);
      Alert.alert("Error", "Something went wrong. Try Again Later");
      navigation.goBack();
      return;
    }
    const data = await res.json();
    if (data.status === "fail") {
      console.log("Failed to get response from server");
      setFetchingConversation(false);
      Alert.alert("Error", data.message);
      navigation.goBack();
      return;
    }
    console.log("Received");
    const receivedConversations =
      JSON.parse(data.data.conversation.conversations) === null
        ? []
        : JSON.parse(data.data.conversation.conversations);
    setCurrentConversation(data.data.conversation);
    setAllConversations(receivedConversations);
    setFetchingConversation(false);
  };

  const deleteConversation = async (id) => {    
    if (!id) {
      Alert.alert("Error", "You need to provide a conversation ID");
      return;
    }
    setDeletingConversation(true);
    const res = await fetch(`${ip}/conversation/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      setDeletingConversation(false);
      Alert.alert("Error", "Something went wrong. Try again later");
      return;
    }
    const data = await res.json();
    if (data.status === "fail") {
      setDeletingConversation(false);
      Alert.alert("Error", data.message);
      return;
    }
    setSummaries((all) =>
      all.filter((conv) => {
        return conv.id !== id;
      })
    );
    setDeletingConversation(false);
  };

  const value = {
    dummyFlashCards,
    dummyQuestions,
    signUp,
    signingUp,
    logIn,
    loggingIn,
    error,
    setError,
    ip,
    localip,
    allFlashCards,
    setAllFlashCards,
    allQuestions,
    setAllQuestions,
    currentUser,
    setCurrentUser,
    setRefresh,
    loadFlashCards,
    flashCardsLoading,
    logOut,
    deleteFlashcard,
    deletingFlashCard,
    deleteQuestion,
    deletingQuestion,
    verifyUser,
    verificationCode,
    getVerificationCode,
    verificationModalVisible,
    setVerificationModalVisible,
    getUserSummaries,
    loadingSummaries,
    setLoadingSummaries,
    summaries,
    createNewSummary,
    creatingSummary,
    question,
    setQuestion,
    sendQuestionAndReceiveAnswer,
    allConversations,
    setAllConversations,
    currentConversation,
    setCurrentConversation,
    getCurrentConversation,
    fetchingConversation,
    awaitingAnswer,
    deleteConversation,
    deletingConversation
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
