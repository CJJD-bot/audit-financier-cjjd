/*==========================================================
 RAPPORT D'AUDIT FINANCIER CJJD ASBL
 SCRIPT.JS
==========================================================*/

/*************************************************
 * LES 9 AXES D'AUDIT
 *************************************************/

const audits = [

    {
    id:"A",
    titre:"Contrôle de la correspondance entre le solde à la clôture de l'exercice N-1 et le solde à l'ouverture de l'exercice N",
    technique:"Cette technique consiste à vérifier la continuité comptable entre deux exercices financiers successifs afin de s'assurer que les soldes arrêtés à la clôture de l'exercice précédent ont été fidèlement repris à l'ouverture de l'exercice suivant.",
    
    verifications:[
        {
        type:"tableA",
        titre:"État détaillé des encaissements (EDE)"
        },
        {
        type:"tableA",
        titre:"Compte Illico Cash"
        },
        {
        type:"tableA",
        titre:"Compte M-Pesa"
        }
        ],
    
    documents:[
    "Rapport financier N-1",
    "Rapport financier N",
    "EDE N-1",
    "EDE N",
    "EDD N-1",
    "EDD N",
    "Relevés Illico Cash",
    "Relevés M-Pesa",
    "Captures des soldes"
    ]
    
    },
    
    {
    id:"B",
    titre:"Contrôle du solde à la clôture de l'exercice",
    
    technique:"Cette technique consiste à vérifier la concordance entre les soldes comptables arrêtés à la clôture de l'exercice et les soldes effectivement disponibles dans les comptes Illico cash et M-pesa de la Clinique.",
    
    verifications:[

        {
        type:"tableB1",
        titre:"Correspondance entre le solde à la clôture de l'exercice N dans l'EDE et la somme des soldes Illico Cash + M-Pesa"
        },
        
        {
        type:"tableB2",
        titre:"Correspondance entre le fonds d'épargne EDE et le solde Illico Cash"
        },
        
        {
        type:"tableB3",
        titre:"Correspondance entre le fonds de caisse EDE et le solde M-Pesa"
        }
        
        ],
    
    documents:[
    "Rapport financier",
    "Extrait EDE",
    "Captures Illico Cash",
    "Captures M-Pesa"
    ]
    
    },
    
    {
    id:"C",
    titre:"Contrôle de la traçabilité des mouvements des comptes durant l'exercice",
    
    technique:"Cette technique consiste à vérifier que chaque opération enregistrée dans les états comptables peut être retracée dans les journaux Illico Cash et M-Pesa.",
    
    verifications:[

        {
        type:"encaissementsEDE",
        titre:"Encaissements enregistrés dans l'EDE"
        },
        
        {
        type:"encaissementsJournal",
        titre:"Encaissements enregistrés dans les journaux Illico Cash et M-Pesa"
        },
        
        {
        type:"decaissementsEDD",
        titre:"Décaissements enregistrés dans l'EDD"
        },
        
        {
        type:"decaissementsJournal",
        titre:"Décaissements enregistrés dans les journaux Illico Cash et M-Pesa"
        }
        
        ],
    
    documents:[
    "Rapport financier",
    "EDE",
    "EDD",
    "Journal Illico Cash",
    "Journal M-Pesa"
    ]
    
    }
    
    ];
    /*======================================================
DONNÉES DESTINÉES À LA SYNTHÈSE DU RAPPORT
======================================================*/

const rapportAudit = {

    A:{
    objectif:"Vérifier la continuité comptable entre le solde de clôture de l'exercice N-1 et le solde d'ouverture de l'exercice N.",
    details:[]
    },
    
    B:{
    objectif:"Vérifier la concordance entre les soldes comptables et les soldes réellement détenus par la CJJD ASBL dans ses comptes Illico cash et M-pesa.",
    details:[]
    },
    
    C:{
    objectif:"Vérifier la traçabilité intégrale des opérations enregistrées dans l'EDE et l'EDD.",
    details:[],
    anomalies:[]
    }
    
    };
    let missionCourante = null;
    /*************************************************
 * TABLEAU DE LA TECHNIQUE A
 *************************************************/

    function renderComparaisonSolde(titre){

        return`
    
        <div class="comparaison-solde">
    
            <h4>${titre}</h4>
    
            <table class="audit-table">
    
                <thead>
    
                    <tr>
    
                        <th>Devise</th>
    
                        <th>Clôture N-1</th>
    
                        <th>Ouverture N</th>
    
                        <th>Écart</th>
    
                        <th>Observation</th>
    
                    </tr>
    
                </thead>
    
                <tbody>
    
                    <tr>
    
                        <td><strong>CDF</strong></td>
    
                        <td>
    
                            <input
                                type="number"
                                class="calcA"
                                data-table="${titre}"
                                data-devise="CDF"
                                data-type="cloture"
                                value="0"
                            >
    
                        </td>
    
                        <td>
    
                            <input
                                type="number"
                                class="calcA"
                                data-table="${titre}"
                                data-devise="CDF"
                                data-type="ouverture"
                                value="0"
                            >
    
                        </td>
    
                        <td>
    
                            <span
                                id="${titre}_CDF_ecart"
                                class="ecart"
                            >
                                0,00
                            </span>
    
                        </td>
    
                        <td>
    
                            <span
                                id="${titre}_CDF_statut"
                                class="ok"
                            >
                                🟢 Conforme
                            </span>
    
                        </td>
    
                    </tr>
    
                    <tr>
    
                        <td><strong>USD</strong></td>
    
                        <td>
    
                            <input
                                type="number"
                                class="calcA"
                                data-table="${titre}"
                                data-devise="USD"
                                data-type="cloture"
                                value="0"
                            >
    
                        </td>
    
                        <td>
    
                            <input
                                type="number"
                                class="calcA"
                                data-table="${titre}"
                                data-devise="USD"
                                data-type="ouverture"
                                value="0"
                            >
    
                        </td>
    
                        <td>
    
                            <span
                                id="${titre}_USD_ecart"
                                class="ecart"
                            >
                                0,00
                            </span>
    
                        </td>
    
                        <td>
    
                            <span
                                id="${titre}_USD_statut"
                                class="ok"
                            >
                                🟢 Conforme
                            </span>
    
                        </td>
    
                    </tr>
    
                </tbody>
    
            </table>
    
        </div>
    
        `;
    
    }
    /*************************************************
 * TABLEAUX DE LA TECHNIQUE B
 *************************************************/

    function renderTechniqueBTable(type,titre){

        let ligne1="";
        let ligne2="";
    
        if(type==="tableB1"){

            contenu=`

<table class="audit-table">

<thead>

<tr>

<th rowspan="2" style="width:10%">Devise</th>

<th rowspan="2" style="width:18%">Solde EDE à la clôture</th>

<th colspan="3" style="width:43%">Soldes des opérateurs</th>

<th rowspan="2" style="width:14%">Écart</th>

<th rowspan="2" style="width:15%">Observation</th>

</tr>

<tr>

<th>Illico Cash</th>

<th>M-Pesa</th>

<th>Somme</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>CDF</strong></td>

<td>

<input
type="number"
class="calcB1"
data-devise="CDF"
data-type="ede">

</td>

<td>

<input
type="number"
class="calcB1"
data-devise="CDF"
data-type="illico">

</td>

<td>

<input
type="number"
class="calcB1"
data-devise="CDF"
data-type="mpesa">

</td>

<td>

<span id="tableB1_CDF_somme">

0,00

</span>

</td>

<td>

<span id="tableB1_CDF_ecart">

0,00

</span>

</td>

<td>

<span
id="tableB1_CDF_statut"
class="ok">

🟢 Conforme

</span>

</td>

</tr>

<tr>

<td><strong>USD</strong></td>

<td>

<input
type="number"
class="calcB1"
data-devise="USD"
data-type="ede">

</td>

<td>

<input
type="number"
class="calcB1"
data-devise="USD"
data-type="illico">

</td>

<td>

<input
type="number"
class="calcB1"
data-devise="USD"
data-type="mpesa">

</td>

<td>

<span id="tableB1_USD_somme">

0,00

</span>

</td>

<td>

<span id="tableB1_USD_ecart">

0,00

</span>

</td>

<td>

<span
id="tableB1_USD_statut"
class="ok">

🟢 Conforme

</span>

</td>

</tr>

</tbody>

</table>

`;

return `

<div class="comparaison-solde">

<h4>${titre}</h4>

${contenu}

</div>

`;
            
            }
        if(type==="tableB2"){
    
            ligne1="Fonds d'épargne EDE";
            ligne2="Solde Illico Cash";
    
        }
    
        if(type==="tableB3"){
    
            ligne1="Fonds de caisse EDE";
            ligne2="Solde M-Pesa";
    
        }
    
        return`
    
        <div class="comparaison-solde">
    
            <h4>${titre}</h4>
    
            <table class="audit-table">
    
                <thead>
    
                    <tr>
    
                        <th>Devise</th>
    
                        <th>${ligne1}</th>
    
                        <th>${ligne2}</th>
    
                        <th>Écart</th>
    
                        <th>Observation</th>
    
                    </tr>
    
                </thead>
    
                <tbody>
    
                    <tr>
    
                        <td><strong>CDF</strong></td>
    
                        <td>
    
                            <input
                            type="number"
                            class="calcB"
                            data-table="${type}"
                            data-devise="CDF"
                            >
    
                        </td>
    
                        <td>
    
                            <input
                            type="number"
                            class="calcB"
                            data-table="${type}"
                            data-devise="CDF"
                            >
    
                        </td>
    
                        <td>
    
                            <span
                            id="${type}_CDF_ecart">
    
                            0,00
    
                            </span>
    
                        </td>
    
                        <td>
    
                            <span
                            id="${type}_CDF_statut"
                            class="ok">
    
                            🟢 Conforme
    
                            </span>
    
                        </td>
    
                    </tr>
    
                    <tr>
    
                        <td><strong>USD</strong></td>
    
                        <td>
    
                            <input
                            type="number"
                            class="calcB"
                            data-table="${type}"
                            data-devise="USD"
                            >
    
                        </td>
    
                        <td>
    
                            <input
                            type="number"
                            class="calcB"
                            data-table="${type}"
                            data-devise="USD"
                            >
    
                        </td>
    
                        <td>
    
                            <span
                            id="${type}_USD_ecart">
    
                            0,00
    
                            </span>
    
                        </td>
    
                        <td>
    
                            <span
                            id="${type}_USD_statut"
                            class="ok">
    
                            🟢 Conforme
    
                            </span>
    
                        </td>
    
                    </tr>
    
                </tbody>
    
            </table>
    
        </div>
    
        `;
    
    }
    /*************************************************
 * TABLEAUX DYNAMIQUES - TECHNIQUE C
 *************************************************/

function renderTechniqueCTable(type,titre){

    return`
    
    <div class="comparaison-solde">
    
    <h4>${titre}</h4>
    
    <table class="audit-table">
    
    <thead>

<tr>

<th style="width:12%">Date</th>

<th style="width:12%">Canal</th>

<th style="width:31%">Libellé de l'opération</th>

<th style="width:12%">Devise</th>

<th style="width:15%">Montant</th>

<th style="width:18%">Référence</th>

</tr>
    
    </thead>
    
    <tbody id="${type}">

<tr>

<td>

<input type="date">

</td>

${

    type==="encaissementsEDE" ||
type==="encaissementsJournal" ||
type==="decaissementsEDD" ||
type==="decaissementsJournal"

?

`

<td>

<select>

<option>Illico Cash</option>

<option>M-Pesa</option>

</select>

</td>

`

:

``

}

<td>

<input
type="text"
placeholder="Libellé">

</td>

<td>

<select>

<option>CDF</option>

<option>USD</option>

</select>

</td>

<td>

<input
type="number"
step="0.01">

</td>

<td>

<input
type="text"
placeholder="Référence">

</td>

</tr>

</tbody>
    
    </table>
    
    <br>
    
    <button type="button"
    
    onclick="ajouterLigne('${type}')">
    
    + Ajouter une opération
    
    </button>
    
    </div>
    
    `;
    
    }
    /*************************************************
 * AJOUT D'UNE LIGNE
 *************************************************/

    function ajouterLigne(id){

        const tbody=document.getElementById(id);
    
        let ligne="";
    
        if(
            id==="encaissementsEDE" ||
            id==="encaissementsJournal" ||
            id==="decaissementsEDD" ||
            id==="decaissementsJournal"
        ){
    
            ligne=`
    
    <tr>
    
    <td>
    
    <input type="date">
    
    </td>
    
    <td>
    
    <select>
    
    <option>Illico Cash</option>
    
    <option>M-Pesa</option>
    
    </select>
    
    </td>
    
    <td>
    
    <input
    type="text"
    placeholder="Libellé">
    
    </td>
    
    <td>
    
    <select>
    
    <option>CDF</option>
    
    <option>USD</option>
    
    </select>
    
    </td>
    
    <td>
    
    <input
    type="number"
    step="0.01">
    
    </td>
    
    <td>
    
    <input
    type="text"
    placeholder="Référence">
    
    </td>
    
    </tr>
    
    `;
    
        }
    
        else{
    
            ligne=`
    
    <tr>
    
    <td>
    
    <input type="date">
    
    </td>
    
    <td>
    
    <input
    type="text"
    placeholder="Libellé">
    
    </td>
    
    <td>
    
    <select>
    
    <option>CDF</option>
    
    <option>USD</option>
    
    </select>
    
    </td>
    
    <td>
    
    <input
    type="number"
    step="0.01">
    
    </td>
    
    <td>
    
    <input
    type="text"
    placeholder="Référence">
    
    </td>
    
    </tr>
    
    `;
    
        }
    
        tbody.insertAdjacentHTML(
    
            "beforeend",
    
            ligne
    
        );
    
    }

    /*************************************************
     * GÉNÉRATION AUTOMATIQUE
     *************************************************/
    
    const container=document.getElementById("auditContainer");

    audits.forEach(a => {
    
        let contenuVerifications = "";
    
        if (a.id === "A") {
    
            contenuVerifications = a.verifications
                .map(v => renderComparaisonSolde(v.titre))
                .join("");
    
        }
    
        else if (a.id === "B") {
    
            contenuVerifications = a.verifications
                .map(v => renderTechniqueBTable(v.type, v.titre))
                .join("");
    
        }
    
        else if (a.id === "C") {
    
            contenuVerifications =
                a.verifications
                    .map(v => renderTechniqueCTable(v.type, v.titre))
                    .join("")
                +
    
    `
    <div class="sub-title">
    Résultat du contrôle
    </div>
    
    <div class="audit-result">
    
    <table class="audit-table">
    
    <tr>
    <td>Opérations contrôlées</td>
    <td id="c_total">0</td>
    </tr>
    
    <tr>
    <td>Conformes</td>
    <td id="c_ok">0</td>
    </tr>
    
    <tr>
    <td>Introuvables</td>
    <td id="c_missing">0</td>
    </tr>
    
    <tr>
    <td>Montants différents</td>
    <td id="c_amount">0</td>
    </tr>
    
    </table>
    
    <br>

    <div
id="c_resultat"
class="audit-status status-ok">

🟢 Conforme

</div>

<br>

<div class="sub-title">

Anomalies détectées

</div>

<table class="audit-table">

<thead>

<tr>

<th>Type</th>

<th>Sens</th>

<th>Date</th>

<th>Canal</th>

<th>Libellé</th>

<th>Devise</th>

<th>Montant</th>

<th>Observation</th>

</tr>

</thead>

<tbody id="c_anomalies">

<tr>

<td colspan="8" style="text-align:center;color:#777">

Aucune anomalie détectée

</td>

</tr>

</tbody>

</table>

</div>
    
    </div>
    `;
    
        }
    
        else {
    
            contenuVerifications =
    
    `
    <div class="checklist">
    
    ${a.verifications.map(v=>`
    
    <label>
    
    <input type="checkbox">
    
    ${v}
    
    </label>
    
    `).join("")}
    
    </div>
    `;
    
        }
    
        container.innerHTML +=
    
    `
    
    <div class="audit-card">
    
        <div class="audit-title">
    
            ${a.id}. ${a.titre}
    
        </div>
    
        <div class="audit-body">
    
            <div class="technique">
    
                ${a.technique}
    
            </div>
    
            <div class="sub-title">
    
                Éléments à vérifier
    
            </div>
    
            ${contenuVerifications}
    
            <div class="sub-title">
    
                Documents communiqués
    
            </div>
    
            <div class="checklist">
    
                ${a.documents.map(d=>`
    
    <label>
    
    <input type="checkbox">
    
    ${d}
    
    </label>
    
    `).join("")}
    
            </div>
    
        </div>
    
    </div>
    
    `;
    
    });
    
    /*************************************************
     * IMPRESSION
     *************************************************/
    
    document.getElementById("printBtn").onclick=function(){
    
    window.print();
    
    };
    /*************************************************
 ENREGISTRER LE RAPPORT
*************************************************/

document.getElementById("saveBtn").onclick=function(){

    let missions=

        JSON.parse(

            localStorage.getItem("missionsCJJD")

        )||[];

        const mission={

            id:Date.now(),
        
            date:new Date().toLocaleString("fr-FR"),
        
            rapport:structuredClone(rapportAudit),
        
            techniqueC:{
        
                encaissementsEDE:extraireTableau("encaissementsEDE"),
        
                encaissementsJournal:extraireTableau("encaissementsJournal"),
        
                decaissementsEDD:extraireTableau("decaissementsEDD"),
        
                decaissementsJournal:extraireTableau("decaissementsJournal")
        
            },
        
            identification:{
        
                numeroRapport:document.getElementById("numeroRapport").value,
        
                exercice:document.getElementById("exercice").value,
        
                dateMission:document.getElementById("dateMission").value,
        
                lieuMission:document.getElementById("lieuMission").value,
        
                presidentCommission:document.getElementById("presidentCommission").value,
        
                membresCommission:document.getElementById("membresCommission").value,
        
                coordonnateur:document.getElementById("coordonnateur").value,
        
                questeurTitulaire:document.getElementById("questeurTitulaire").value,
        
                questeurAdjoint:document.getElementById("questeurAdjoint").value
        
            },
        
            conclusion:{
        
                opinion:document.getElementById("opinion").value,
        
                motivation:document.getElementById("motivation").value,
        
                recommandations:document.getElementById("recommandations").value,
        
                lieuCloture:document.getElementById("lieuCloture").value,
        
                dateCloture:document.getElementById("dateCloture").value
        
            }
        
        };

    missions.push(mission);

    localStorage.setItem(

        "missionsCJJD",

        JSON.stringify(missions)

    );

    chargerRapports();

    alert("Rapport enregistré avec succès.");

};
/*************************************************
 NOUVELLE MISSION
*************************************************/
function extraireTableau(id){

    const tbody=document.getElementById(id);

    if(!tbody) return [];

    const lignes=[];

    tbody.querySelectorAll("tr").forEach(tr=>{

        const champs=tr.querySelectorAll("input,select");

        if(champs.length<6) return;

        lignes.push({

            date:champs[0].value,

            canal:champs[1].value,

            libelle:champs[2].value,

            devise:champs[3].value,

            montant:champs[4].value,

            reference:champs[5].value

        });

    });

    return lignes;

}
document.getElementById("newMissionBtn").onclick=function(){

    if(

        !confirm(

            "Voulez-vous réellement commencer une nouvelle mission d'audit ?"

        )

    ) return;

    localStorage.removeItem("rapportAuditCJJD");

    location.reload();

};
/*************************************************
 * CALCUL AUTOMATIQUE - TECHNIQUE A
 *************************************************/

document.addEventListener("input", function (e) {

    if (!e.target.classList.contains("calcA")) return;

    calculTechniqueA();

});

function calculTechniqueA() {

    const tableaux = [

        "État détaillé des encaissements (EDE)",

        "Compte Illico Cash",

        "Compte M-Pesa"

    ];

    tableaux.forEach(titre => {

        calculLigneTechniqueA(titre, "CDF");

        calculLigneTechniqueA(titre, "USD");

    });
    updateSummary();
}

/*************************************************
 * CALCUL D'UNE LIGNE
 *************************************************/

function calculLigneTechniqueA(titre, devise) {

    const champs = document.querySelectorAll(

        `input.calcA[data-table="${titre}"][data-devise="${devise}"]`

    );

    if (champs.length !== 2) return;

    const cloture = parseFloat(champs[0].value) || 0;

    const ouverture = parseFloat(champs[1].value) || 0;

    const ecart = Math.abs(cloture - ouverture);
    rapportAudit.A.details =
rapportAudit.A.details.filter(l =>

!(l.compte===titre && l.devise===devise)

);

rapportAudit.A.details.push({

compte:titre,

devise,

cloture,

ouverture,

ecart,

conforme:ecart===0

});

    const celluleEcart = document.getElementById(

        `${titre}_${devise}_ecart`

    );

    const celluleStatut = document.getElementById(

        `${titre}_${devise}_statut`

    );

    if (celluleEcart) {

        celluleEcart.textContent = ecart.toLocaleString("fr-FR", {

            minimumFractionDigits: 2,

            maximumFractionDigits: 2

        });

    }

    if (celluleStatut) {

        if (ecart === 0) {

            celluleStatut.innerHTML = "🟢 Conforme";

            celluleStatut.className = "ok";

        } else {

            celluleStatut.innerHTML = "🔴 Non conforme";

            celluleStatut.className = "ko";

        }

    }

}
/*************************************************
 * CALCUL AUTOMATIQUE - TECHNIQUE B
 *************************************************/

document.addEventListener("input", function(e){

    if(

        !e.target.classList.contains("calcB") &&

        !e.target.classList.contains("calcB1")

    ) return;

    calculTechniqueB();

});

function calculTechniqueB(){

    calculTableB1();

    calculLigneTechniqueB("tableB2","CDF");
    calculLigneTechniqueB("tableB2","USD");

    calculLigneTechniqueB("tableB3","CDF");
    calculLigneTechniqueB("tableB3","USD");

    updateSummary();

}
/*************************************************
 * CALCUL DE LA TECHNIQUE B1
 *************************************************/

function calculTableB1(){

    ["CDF","USD"].forEach(devise=>{

        const ede=document.querySelector(
            `.calcB1[data-devise="${devise}"][data-type="ede"]`
        );

        const illico=document.querySelector(
            `.calcB1[data-devise="${devise}"][data-type="illico"]`
        );

        const mpesa=document.querySelector(
            `.calcB1[data-devise="${devise}"][data-type="mpesa"]`
        );

        if(!ede || !illico || !mpesa) return;

        const soldeEDE=parseFloat(ede.value)||0;

        const soldeIllico=parseFloat(illico.value)||0;

        const soldeMpesa=parseFloat(mpesa.value)||0;

        const somme=soldeIllico+soldeMpesa;

        const ecart=Math.abs(soldeEDE-somme);
        rapportAudit.B.details =
rapportAudit.B.details.filter(l =>

!(l.controle==="tableB1" && l.devise===devise)

);

rapportAudit.B.details.push({

controle:"tableB1",

devise,

ede:soldeEDE,

illico:soldeIllico,

mpesa:soldeMpesa,

somme,

ecart,

conforme:ecart===0

});

        document.getElementById(
            `tableB1_${devise}_somme`
        ).textContent=somme.toLocaleString("fr-FR",{

            minimumFractionDigits:2,

            maximumFractionDigits:2

        });

        document.getElementById(
            `tableB1_${devise}_ecart`
        ).textContent=ecart.toLocaleString("fr-FR",{

            minimumFractionDigits:2,

            maximumFractionDigits:2

        });

        const statut=document.getElementById(
            `tableB1_${devise}_statut`
        );

        if(ecart===0){

            statut.innerHTML="🟢 Conforme";

            statut.className="ok";

        }

        else{

            statut.innerHTML="🔴 Non conforme";

            statut.className="ko";

        }

    });

}

function calculLigneTechniqueB(type,devise){

    const champs=document.querySelectorAll(

        `input.calcB[data-table="${type}"][data-devise="${devise}"]`

    );

    if(champs.length!==2) return;

    const montant1=parseFloat(champs[0].value)||0;

    const montant2=parseFloat(champs[1].value)||0;

    const ecart=Math.abs(montant1-montant2);
    rapportAudit.B.details =
rapportAudit.B.details.filter(l =>

!(l.controle===type && l.devise===devise)

);

rapportAudit.B.details.push({

controle:type,

devise,

valeur1:montant1,

valeur2:montant2,

ecart,

conforme:ecart===0

});

    const celluleEcart=document.getElementById(

        `${type}_${devise}_ecart`

    );

    const celluleStatut=document.getElementById(

        `${type}_${devise}_statut`

    );

    if(celluleEcart){

        celluleEcart.textContent=

        ecart.toLocaleString("fr-FR",{

            minimumFractionDigits:2,

            maximumFractionDigits:2

        });

    }

    if(celluleStatut){

        if(ecart===0){

            celluleStatut.innerHTML="🟢 Conforme";

            celluleStatut.className="ok";

        }

        else{

            celluleStatut.innerHTML="🔴 Non conforme";

            celluleStatut.className="ko";

        }

    }

}
/*************************************************
 CALCUL AUTOMATIQUE - TECHNIQUE C
*************************************************/

document.addEventListener("input", function(e){

    if(
        e.target.closest("#encaissementsEDE") ||
        e.target.closest("#encaissementsJournal") ||
        e.target.closest("#decaissementsEDD") ||
        e.target.closest("#decaissementsJournal")
    ){

        calculTechniqueC();

    }

});
function calculTechniqueC(){

    const edeEnc = document.getElementById("encaissementsEDE");

    const journalEnc = document.getElementById("encaissementsJournal");

    const eddDec = document.getElementById("decaissementsEDD");

    const journalDec = document.getElementById("decaissementsJournal");

    if(
        !edeEnc ||
        !journalEnc ||
        !eddDec ||
        !journalDec
    ){
        return;
    }

    let total = 0;
    let conformes = 0;
    let introuvables = 0;
    let montantsDifferents = 0;
    const operationsControlees = new Set();
    const anomalies = [];
    /*==================================================
RAPPROCHEMENT DES ENCAISSEMENTS
==================================================*/

const lignesEDE = edeEnc.querySelectorAll("tr");
const lignesJournal = journalEnc.querySelectorAll("tr");

lignesEDE.forEach(ligneEDE=>{

    const champsEDE = ligneEDE.querySelectorAll("input,select");

    if(champsEDE.length < 6) return;

    const date = champsEDE[0].value;
    const canal = champsEDE[1].value;
    const libelle = champsEDE[2].value.trim();
    const devise = champsEDE[3].value;
    const montant = parseFloat(champsEDE[4].value) || 0;
    const reference = champsEDE[5].value.trim();

if(

    date==="" ||
    
    libelle==="" ||
    
    montant<=0
    
    ){
    
        return;
    
    }
    const cleOperation =

date +
"|" +
canal +
"|" +
libelle +
"|" +
devise +
"|" +
montant;

    let trouve = false;

    lignesJournal.forEach(ligneJournal=>{

        const champsJournal = ligneJournal.querySelectorAll("input,select");

        if(champsJournal.length < 4) return;
            const dateJournal = champsJournal[0].value;

const canal = champsJournal[1].value;

const libelleJournal = champsJournal[2].value.trim();

const deviseJournal = champsJournal[3].value;

const montantJournal = parseFloat(champsJournal[4].value) || 0;

const referenceJournal = champsJournal[5].value.trim();

if(

    dateJournal==="" ||

    libelleJournal==="" ||

    montantJournal<=0

){

    return;

}

const cleOperationJournal =

dateJournal +
"|" +
canal +
"|" +
libelleJournal +
"|" +
deviseJournal +
"|" +
montantJournal;

if(

    dateJournal===date &&

    canal===champsJournal[1].value &&

    libelleJournal===libelle &&

    deviseJournal===devise

){
    operationsControlees.add(cleOperation);

            trouve = true;

            if(montant===montantJournal){

                conformes++;

            }else{

                montantsDifferents++;

anomalies.push({

    type:"Encaissement",

    sens:"EDE → Journal",

    date,

    canal,

    libelle,

    devise,

    montant,

    observation:"🟡 Montant différent"

});

            }

        }

    });

    if(!trouve){

        operationsControlees.add(cleOperation);
        introuvables++;
    
        anomalies.push({
    
            type:"Encaissement",
    
            sens:"EDE → Journal",
    
            date,
    
            canal:"—",
    
            libelle,
    
            devise,
    
            montant,
    
            observation:"🔴 Introuvable dans le journal"
    
        });
    
    }

});

/*==================================================
VÉRIFICATION DES OPÉRATIONS DU JOURNAL
ABSENTES DE L'EDE
==================================================*/

lignesJournal.forEach(ligneJournal=>{

    const champsJournal = ligneJournal.querySelectorAll("input,select");

    if(champsJournal.length < 6) return;

    const dateJournal = champsJournal[0].value;

    const libelleJournal = champsJournal[2].value.trim();

    const deviseJournal = champsJournal[3].value;

    const montantJournal = parseFloat(champsJournal[4].value) || 0;
    const canal = champsJournal[1].value;

    if(

        dateJournal==="" ||
    
        libelleJournal==="" ||
    
        montantJournal<=0
    
    ){
    
        return;
    
    }
    const cleOperationJournal =

dateJournal +
"|" +
canal +
"|" +
libelleJournal +
"|" +
deviseJournal +
"|" +
montantJournal;

    let trouve = false;

    lignesEDE.forEach(ligneEDE=>{

        const champsEDE = ligneEDE.querySelectorAll("input,select");

        if(champsEDE.length < 6) return;

        const date = champsEDE[0].value;
        const canal = champsEDE[1].value;
        const libelle = champsEDE[2].value.trim();
        const devise = champsEDE[3].value;

        if(

            date===dateJournal &&
        
            canal===champsJournal[1].value &&
        
            libelle===libelleJournal &&
        
            devise===deviseJournal
        
        ){
            operationsControlees.add(cleOperationJournal);
            trouve = true;
        
        }

    });

    if(!trouve){

        operationsControlees.add(cleOperationJournal);
        introuvables++;

    anomalies.push({

        type:"Encaissement",

        sens:"Journal → EDE",

        date:dateJournal,

        canal,

        libelle:libelleJournal,

        devise:deviseJournal,

        montant:montantJournal,

        observation:"🔴 Introuvable dans l'EDE"

    });

}

});
/*==================================================
RAPPROCHEMENT DES DÉCAISSEMENTS
==================================================*/

const lignesEDD = eddDec.querySelectorAll("tr");

const lignesJournalDec = journalDec.querySelectorAll("tr");

lignesEDD.forEach(ligneEDD=>{

    const champsEDD = ligneEDD.querySelectorAll("input,select");

    if(champsEDD.length < 6) return;

    const date = champsEDD[0].value;

    const canal = champsEDD[1].value;
    
    const libelle = champsEDD[2].value.trim();
    
    const devise = champsEDD[3].value;
    
    const montant = parseFloat(champsEDD[4].value) || 0;
    
    const reference = champsEDD[5].value.trim();

    if(

        date==="" ||
    
        libelle==="" ||
    
        montant<=0
    
    ){
    
        return;
    
    }

    const cleOperation =

date +
"|" +
canal +
"|" +
libelle +
"|" +
devise +
"|" +
montant;

    let trouve = false;

    lignesJournalDec.forEach(ligneJournal=>{

        const champsJournal = ligneJournal.querySelectorAll("input,select");

        if(champsJournal.length < 6) return;

        const dateJournal = champsJournal[0].value;

        const libelleJournal = champsJournal[2].value.trim();

        const deviseJournal = champsJournal[3].value;

        const montantJournal = parseFloat(champsJournal[4].value) || 0;

        if(

            dateJournal==="" ||

            libelleJournal==="" ||

            montantJournal<=0

        ){

            return;

        }

        const cleOperationJournal =

dateJournal +
"|" +
canal +
"|" +
libelleJournal +
"|" +
deviseJournal +
"|" +
montantJournal;


if(

    date===dateJournal &&

    canal===champsJournal[1].value &&

    libelle===libelleJournal &&

    devise===deviseJournal

){
    operationsControlees.add(cleOperation);
            trouve = true;

            if(montant===montantJournal){

                conformes++;

            }

            else{

                montantsDifferents++;

anomalies.push({

    type:"Décaissement",

    sens:"EDD → Journal",

    date,

    canal,

    libelle,

    devise,

    montant,

    observation:"🟡 Montant différent"

});

            }

        }

    });

    if(!trouve){

        operationsControlees.add(cleOperation);
        introuvables++;
    
        anomalies.push({
    
            type:"Décaissement",
    
            sens:"EDD → Journal",
    
            date,
    
            canal,
    
            libelle,
    
            devise,
    
            montant,
    
            observation:"🔴 Introuvable dans le journal"
    
        });
    
    }

});
/*==================================================
VÉRIFICATION DES DÉCAISSEMENTS
DU JOURNAL ABSENTS DE L'EDD
==================================================*/

lignesJournalDec.forEach(ligneJournal=>{

    const champsJournal = ligneJournal.querySelectorAll("input,select");

    if(champsJournal.length < 6) return;

    const dateJournal = champsJournal[0].value;

const canal = champsJournal[1].value;

const libelleJournal = champsJournal[2].value.trim();

const deviseJournal = champsJournal[3].value;

const montantJournal = parseFloat(champsJournal[4].value) || 0;

const referenceJournal = champsJournal[5].value.trim();
if(

    dateJournal==="" ||

    libelleJournal==="" ||

    montantJournal<=0

){

    return;

}

const cleOperationJournal =

dateJournal +
"|" +
canal +
"|" +
libelleJournal +
"|" +
deviseJournal +
"|" +
montantJournal; 

    let trouve = false;

    lignesEDD.forEach(ligneEDD=>{

        const champsEDD = ligneEDD.querySelectorAll("input,select");
        if(champsEDD.length < 6) return;

        const date = champsEDD[0].value;

const canal = champsEDD[1].value;

const libelle = champsEDD[2].value.trim();

const devise = champsEDD[3].value;

const montant = parseFloat(champsEDD[4].value) || 0;

const reference = champsEDD[5].value.trim();

if(

    date===dateJournal &&

    canal===champsJournal[1].value &&

    libelle===libelleJournal &&

    devise===deviseJournal

){

    operationsControlees.add(cleOperationJournal);
    trouve = true;

}

    });

    if(!trouve){

        operationsControlees.add(cleOperationJournal);
        introuvables++;
    
        anomalies.push({
    
            type:"Décaissement",
    
            sens:"Journal → EDD",
    
            date:dateJournal,
    
            canal,
    
            libelle:libelleJournal,
    
            devise:deviseJournal,
    
            montant:montantJournal,
    
            observation:"🔴 Introuvable dans l'EDD"
    
        });
    
    }

});

total = operationsControlees.size;
document.getElementById("c_total").textContent = total;

document.getElementById("c_ok").textContent = conformes;

document.getElementById("c_missing").textContent = introuvables;

document.getElementById("c_amount").textContent = montantsDifferents;

const resultat = document.getElementById("c_resultat");

if(introuvables===0 && montantsDifferents===0){

    resultat.className="audit-status status-ok";

    resultat.innerHTML="🟢 Conforme";

}

else if(montantsDifferents===0){

    resultat.className="audit-status status-warning";

    resultat.innerHTML="🟡 Conforme avec observations";

}

else{

    resultat.className="audit-status status-error";

    resultat.innerHTML="🔴 Non conforme";

}
const tbody = document.getElementById("c_anomalies");

if(tbody){

    if(anomalies.length===0){

        tbody.innerHTML=`

        <tr>

        <td colspan="8"
        style="text-align:center;color:#777">

        Aucune anomalie détectée

        </td>

        </tr>

        `;

    }

    else{

        tbody.innerHTML="";

        anomalies.forEach(a=>{

            tbody.innerHTML += `

            <tr>

            <td>${a.type}</td>

            <td>${a.sens}</td>

            <td>${a.date}</td>

            <td>${a.canal}</td>

            <td>${a.libelle}</td>

            <td>${a.devise}</td>

            <td style="text-align:right">

            ${Number(a.montant).toLocaleString("fr-FR")}

            </td>

            <td>${a.observation}</td>

            </tr>

            `;

        });

    }

}
rapportAudit.C.details=[{

    operations:total,
    
    conformes,
    
    introuvables,
    
    montantsDifferents
    
    }];
    
    rapportAudit.C.anomalies=[...anomalies];
updateSummary();
}
/*======================================================
SYNTHÈSE AUTOMATIQUE DE L'AUDIT
======================================================*/

function updateSummary(){

    const summary=document.getElementById("summary");

    if(!summary) return;

    let html=`

    <p>

    Conformément au Manuel de méthodologie d'audit financier de la Commission de contrôle de la CJJD ASBL, les vérifications ont porté sur les techniques d'audit applicables aux états comptables de l'exercice audité.

    Les constats ci-dessous reprennent, pour chaque technique, l'objectif poursuivi, les vérifications effectuées ainsi que les anomalies éventuellement relevées.

    </p>

    `;

    /*==================================================
    TECHNIQUE A
    ==================================================*/

    html+=`

    <h4>Technique A – Contrôle de la continuité comptable</h4>

    <p>

    <div class="summary-bloc-title">
🎯 Objectif poursuivi
</div>

    Cette technique avait pour objectif de vérifier que les soldes arrêtés à la clôture de l'exercice N−1 ont été fidèlement repris comme soldes d'ouverture de l'exercice N, afin de garantir la continuité comptable.

    </p>

    <p>

    <div class="summary-bloc-title">
📋 Constats
</div>

    </p>

    `;

    const groupesA={};

    rapportAudit.A.details.forEach(ligne=>{

        if(!groupesA[ligne.compte]){

            groupesA[ligne.compte]={};

        }

        groupesA[ligne.compte][ligne.devise]=ligne;

    });

    Object.keys(groupesA).forEach(compte=>{

        const cdf=groupesA[compte]["CDF"];

        const usd=groupesA[compte]["USD"];

        html+=`

        <p>

        <strong>${compte}</strong>

        </p>

        `;

        /*======================
        CDF
        ======================*/

        if(cdf){

            if(cdf.conforme){

                html+=`

                <p>

                Les vérifications ont révélé une parfaite correspondance entre le solde de clôture de l'exercice N−1

                (<strong>${cdf.cloture.toLocaleString("fr-FR")} CDF</strong>)

                et le solde d'ouverture de l'exercice N

                (<strong>${cdf.ouverture.toLocaleString("fr-FR")} CDF</strong>).

                Aucun écart n'a été constaté.

                </p>

                `;

            }

            else{

                html+=`

                <p>

                Les vérifications ont mis en évidence un écart de

                <strong>${cdf.ecart.toLocaleString("fr-FR")} CDF</strong>

                entre le solde de clôture de l'exercice N−1

                (<strong>${cdf.cloture.toLocaleString("fr-FR")} CDF</strong>)

                et le solde d'ouverture de l'exercice N

                (<strong>${cdf.ouverture.toLocaleString("fr-FR")} CDF</strong>).

                Cette différence traduit une rupture de continuité comptable nécessitant des explications.

                </p>

                `;

            }

        }

        /*======================
        USD
        ======================*/

        if(usd){

            if(usd.conforme){

                html+=`

                <p>

                En devise USD, la même concordance a été constatée entre le solde de clôture

                (<strong>${usd.cloture.toLocaleString("fr-FR")} USD</strong>)

                et le solde d'ouverture

                (<strong>${usd.ouverture.toLocaleString("fr-FR")} USD</strong>),

                sans aucun écart.

                </p>

                `;

            }

            else{

                html+=`

                <p>

                En devise USD, un écart de

                <strong>${usd.ecart.toLocaleString("fr-FR")} USD</strong>

                a été observé entre le solde de clôture

                (<strong>${usd.cloture.toLocaleString("fr-FR")} USD</strong>)

                et le solde d'ouverture

                (<strong>${usd.ouverture.toLocaleString("fr-FR")} USD</strong>).

                </p>

                `;

            }

        }

    });

    let anomaliesA = rapportAudit.A.details.filter(l=>!l.conforme).length;

    if(anomaliesA===0){

        html+=`

        <p>

        <strong>Conclusion partielle.</strong>

        Les vérifications effectuées dans le cadre de la technique A n'ont révélé aucune anomalie.

        La continuité comptable est assurée entre les exercices contrôlés.

        </p>

        `;

    }

    else{

        html+=`

        <p>

        <strong>Conclusion partielle.</strong>

        La technique A a mis en évidence

        <strong>${anomaliesA}</strong>

        anomalie(s) affectant la continuité comptable.

        Ces écarts devront être justifiés par les responsables financiers.

        </p>

        `;

    }
    /*==================================================
TECHNIQUE B
==================================================*/

html+=`

<h4>Technique B – Contrôle du solde à la clôture de l'exercice</h4>

<p>

<div class="summary-bloc-title">
🎯 Objectif poursuivi
</div>

Cette technique avait pour objectif de vérifier que les soldes comptabilisés dans les états comptables (EDE et EDD) correspondent effectivement aux soldes disponibles dans les comptes Illico cash et M-pesa de la Clinique.

</p>

<p>

<div class="summary-bloc-title">
📋 Constats
</div>

</p>

`;

const b1 = rapportAudit.B.details.filter(l=>l.controle==="tableB1");

b1.forEach(ligne=>{

    html+=`

    <p>

    <strong>${ligne.devise}</strong>

    </p>

    `;

    if(ligne.conforme){

        html+=`

        <p>

        Le contrôle a révélé une parfaite concordance entre le solde de clôture enregistré dans l'État détaillé des encaissements

        (<strong>${ligne.ede.toLocaleString("fr-FR")} ${ligne.devise}</strong>)

        et la somme des soldes disponibles dans les comptes Illico cash et M-pesa de la CJJD ASBL, soit :

        Illico Cash :

        <strong>${ligne.illico.toLocaleString("fr-FR")} ${ligne.devise}</strong>

        +

        M-Pesa :

        <strong>${ligne.mpesa.toLocaleString("fr-FR")} ${ligne.devise}</strong>

        =

        <strong>${ligne.somme.toLocaleString("fr-FR")} ${ligne.devise}</strong>.

        Aucun écart n'a été constaté.

        </p>

        `;

    }

    else{

        html+=`

        <p>

        Le contrôle a mis en évidence une différence entre le solde comptabilisé dans l'EDE

        (<strong>${ligne.ede.toLocaleString("fr-FR")} ${ligne.devise}</strong>)

        et la somme des soldes réellement disponibles dans les comptes Illico cash et M-pesa de la CJJD ASBL :

        Illico Cash

        (<strong>${ligne.illico.toLocaleString("fr-FR")} ${ligne.devise}</strong>)

        +

        M-Pesa

        (<strong>${ligne.mpesa.toLocaleString("fr-FR")} ${ligne.devise}</strong>)

        =

        <strong>${ligne.somme.toLocaleString("fr-FR")} ${ligne.devise}</strong>.

        L'écart constaté s'élève à

        <strong>${ligne.ecart.toLocaleString("fr-FR")} ${ligne.devise}</strong>.

        </p>

        `;

    }

});


const b2 = rapportAudit.B.details.filter(l=>l.controle==="tableB2");

b2.forEach(ligne=>{

    if(ligne.conforme){

        html+=`

        <p>

        Le fonds d'épargne comptabilisé dans l'EDE correspond exactement au solde Illico Cash en

        <strong>${ligne.devise}</strong>.

        Les deux montants sont identiques

        (<strong>${ligne.valeur1.toLocaleString("fr-FR")} ${ligne.devise}</strong>).

        </p>

        `;

    }

    else{

        html+=`

        <p>

        Une différence de

        <strong>${ligne.ecart.toLocaleString("fr-FR")} ${ligne.devise}</strong>

        a été constatée entre le fonds d'épargne de l'EDE

        (<strong>${ligne.valeur1.toLocaleString("fr-FR")} ${ligne.devise}</strong>)

        et le solde Illico Cash

        (<strong>${ligne.valeur2.toLocaleString("fr-FR")} ${ligne.devise}</strong>).

        </p>

        `;

    }

});


const b3 = rapportAudit.B.details.filter(l=>l.controle==="tableB3");

b3.forEach(ligne=>{

    if(ligne.conforme){

        html+=`

        <p>

        Le fonds de caisse enregistré dans l'EDE correspond parfaitement au solde M-Pesa en

        <strong>${ligne.devise}</strong>.

        Les deux montants sont identiques

        (<strong>${ligne.valeur1.toLocaleString("fr-FR")} ${ligne.devise}</strong>).

        </p>

        `;

    }

    else{

        html+=`

        <p>

        Une différence de

        <strong>${ligne.ecart.toLocaleString("fr-FR")} ${ligne.devise}</strong>

        a été constatée entre le fonds de caisse EDE

        (<strong>${ligne.valeur1.toLocaleString("fr-FR")} ${ligne.devise}</strong>)

        et le solde M-Pesa

        (<strong>${ligne.valeur2.toLocaleString("fr-FR")} ${ligne.devise}</strong>).

        </p>

        `;

    }

});


const anomaliesB = rapportAudit.B.details.filter(l=>!l.conforme).length;

if(anomaliesB===0){

    html+=`

    <p>

    <strong>Conclusion partielle.</strong>

    Les vérifications réalisées dans le cadre de la technique B n'ont révélé aucune anomalie.

    Les soldes comptabilisés concordent avec les soldes effectivement disponibles dans les comptes Illico cas et M-pesa de la CJJD ASBL.

    </p>

    `;

}

else{

    html+=`

    <p>

    <strong>Conclusion partielle.</strong>

    Les vérifications réalisées dans le cadre de la technique B ont révélé

    <strong>${anomaliesB}</strong>

    anomalie(s) portant sur la concordance des soldes.

    Les écarts observés devront être justifiés ou régularisés.

    </p>

    `;

}
/*==================================================
TECHNIQUE C
==================================================*/

html+=`

<h4>Technique C – Contrôle de la traçabilité des opérations</h4>

<p>

<div class="summary-bloc-title">
🎯 Objectif poursuivi
</div>

Cette technique avait pour objectif de vérifier que chaque opération enregistrée dans les États détaillés des encaissements (EDE) et des décaissements (EDD) est effectivement retrouvée dans les journaux financiers Illico Cash et M-Pesa, avec les mêmes caractéristiques essentielles (date, devise, libellé et montant).

</p>

<p>

<div class="summary-bloc-title">
📋 Constats
</div>

</p>

`;

const stats = rapportAudit.C.details[0];

if(stats){

    html+=`

    <p>

    Au total,

    <strong>${stats.operations}</strong>

    opération(s) ont été soumise(s) au contrôle de concordance.

    Parmi celles-ci,

    <strong>${stats.conformes}</strong>

    opération(s) ont été retrouvée(s) sans aucune anomalie,

    <strong>${stats.introuvables}</strong>

    opération(s) n'ont pas pu être retrouvée(s)

    et

    <strong>${stats.montantsDifferents}</strong>

    opération(s) présentent une divergence de montant.

    </p>

    `;

}

if(rapportAudit.C.anomalies.length===0){

    html+=`

    <p>

    Toutes les opérations contrôlées ont été retrouvées dans les journaux correspondants.

    Les informations relatives à la date, au canal, au libellé, à la devise et au montant sont parfaitement concordantes.

    </p>

    `;

}

else{

    html+=`

    <p>

    Les anomalies suivantes ont été relevées au cours des travaux de rapprochement :

    </p>

    <ul>

    `;

    rapportAudit.C.anomalies.forEach(a=>{

        html+=`<li>`;

        if(a.observation.includes("Introuvable")){

            html+=`

            L'opération de

            <strong>${a.type.toLowerCase()}</strong>

            datée du

            <strong>${a.date}</strong>,

            libellée

            <strong>${a.libelle}</strong>,

            d'un montant de

            <strong>${a.montant.toLocaleString("fr-FR")} ${a.devise}</strong>,

            n'a pas pu être retrouvée dans le document de rapprochement attendu.

            `;

        }

        else{

            html+=`

            L'opération de

            <strong>${a.type.toLowerCase()}</strong>

            datée du

            <strong>${a.date}</strong>

            présente une divergence de montant.

            Le montant contrôlé est de

            <strong>${a.montant.toLocaleString("fr-FR")} ${a.devise}</strong>.

            Une vérification complémentaire est nécessaire afin de déterminer l'origine de cette différence.

            `;

        }

        html+=`</li>`;

    });

    html+=`</ul>`;

}

if(stats){

    if(stats.introuvables===0 && stats.montantsDifferents===0){

        html+=`

        <p>

        <strong>Conclusion partielle.</strong>

        Les contrôles réalisés dans le cadre de la technique C démontrent une parfaite traçabilité des opérations financières.

        Toutes les opérations enregistrées dans les états comptables ont été retrouvées dans les journaux correspondants sans aucune divergence.

        </p>

        `;

    }

    else{

        html+=`

        <p>

        <strong>Conclusion partielle.</strong>

        Les travaux de rapprochement ont mis en évidence

        <strong>${stats.introuvables}</strong>

        opération(s) introuvable(s)

        et

        <strong>${stats.montantsDifferents}</strong>

        divergence(s) de montant.

        Ces anomalies devront faire l'objet d'explications ou de régularisations avant la clôture définitive du rapport.

        </p>

        `;

    }

}
/*==================================================
CONCLUSION GÉNÉRALE DE LA MISSION
==================================================*/

let techniquesConformes = 0;

if(rapportAudit.A.details.length &&
rapportAudit.A.details.every(l=>l.conforme))
techniquesConformes++;

if(rapportAudit.B.details.length &&
rapportAudit.B.details.every(l=>l.conforme))
techniquesConformes++;

if(
rapportAudit.C.details.length &&
rapportAudit.C.details[0].introuvables===0 &&
rapportAudit.C.details[0].montantsDifferents===0
)
techniquesConformes++;

html+=`

<hr>

<h3>Conclusion générale des constats</h3>

`;

if(techniquesConformes===3){

    html+=`

    <p>

    Les travaux de contrôle réalisés sur les trois techniques d'audit prévues par le Manuel de méthodologie n'ont révélé aucune anomalie significative.

    Les vérifications effectuées démontrent :

    </p>

    <ul>

        <li>la continuité comptable entre les exercices ;</li>

        <li>la concordance des soldes comptables avec les soldes détenus dans les comptes Illico cash et M-pesa de la CJJD ASBL ;</li>

        <li>la parfaite traçabilité des opérations financières enregistrées.</li>

    </ul>

    <p>

    Les éléments contrôlés constituent ainsi une base fiable pour la formulation de l'opinion de la Commission de contrôle.

    </p>

    `;

}

else{

    html+=`

    <p>

    Les travaux de contrôle ont permis d'identifier plusieurs anomalies nécessitant une analyse complémentaire avant la formulation de l'opinion définitive de la Commission.

    Les principales observations concernent notamment :

    </p>

    <ul>

    `;

    if(rapportAudit.A.details.some(l=>!l.conforme)){

        html+=`

        <li>

        des ruptures de continuité comptable entre les exercices ;

        </li>

        `;

    }

    if(rapportAudit.B.details.some(l=>!l.conforme)){

        html+=`

        <li>

        des écarts entre les soldes comptables et les soldes réellement disponibles dans les comptes Illico cash et M-pesa de la CJJD ASBL ;

        </li>

        `;

    }

    if(
        rapportAudit.C.details.length &&
        (
            rapportAudit.C.details[0].introuvables>0 ||
            rapportAudit.C.details[0].montantsDifferents>0
        )
    ){

        html+=`

        <li>

        des anomalies de traçabilité des opérations financières ;

        </li>

        `;

    }

    html+=`

    </ul>

    <p>

    Ces constats constituent les éléments objectifs sur lesquels la Commission de contrôle fondera son opinion et, le cas échéant, ses recommandations générales.

    </p>

    `;

}

summary.innerHTML = html;

}
if("serviceWorker" in navigator){

    navigator.serviceWorker.register("service-worker.js");
    
    }
    function chargerRapports(){

        const liste=document.getElementById("savedReports");
    
        if(!liste) return;
    
        const missions=
    
            JSON.parse(
    
                localStorage.getItem("missionsCJJD")
    
            )||[];
    
        if(missions.length===0){
    
            liste.innerHTML=
    
            `<div class="empty-report">
    
            Aucun rapport enregistré.
    
            </div>`;
    
            return;
    
        }
    
        liste.innerHTML="";
    
        missions.forEach((mission,index)=>{
    
            liste.innerHTML+=`
    
            <div class="report-card">
    
                <div class="report-info">
    
                    <strong>Mission ${index+1}</strong><br>
    
                    ${mission.date}
    
                </div>
    
                <div class="report-actions">
    
                    <button onclick="ouvrirMission(${mission.id})">
    
                        📂 Ouvrir
    
                    </button>
    
                    <button onclick="supprimerMission(${mission.id})">
    
                        🗑 Supprimer
    
                    </button>
    
                </div>
    
            </div>
    
            `;
    
        });
    
    }
    function supprimerMission(id){

        if(!confirm("Supprimer ce rapport ?"))
    
            return;
    
        let missions=
    
            JSON.parse(
    
                localStorage.getItem("missionsCJJD")
    
            )||[];
    
        missions=missions.filter(
    
            m=>m.id!==id
    
        );
    
        localStorage.setItem(
    
            "missionsCJJD",
    
            JSON.stringify(missions)
    
        );
    
        chargerRapports();
    
    }
    function ouvrirMission(id){

        const missions = JSON.parse(
    
            localStorage.getItem("missionsCJJD")
    
        ) || [];
    
        missionCourante = missions.find(
    
            m => m.id === id
    
        );
    
        if(!missionCourante){
    
            alert("Mission introuvable.");
    
            return;
    
        }
    
        if(confirm(
    
            "Voulez-vous ouvrir cette mission ? Les données actuellement affichées seront remplacées."
    
        )){
    
            chargerMission();
    
        }
    
    }
    function chargerMission(){

        if(!missionCourante) return;
    
        const rapport = missionCourante.rapport;
    
        /*-----------------------------------------
          Technique A
        -----------------------------------------*/
    
        rapportAudit.A.details = structuredClone(
    
            rapport.A.details
    
        );
        /*-----------------------------------------
  Recharger les champs de la Technique A
-----------------------------------------*/

rapportAudit.A.details.forEach(ligne=>{

    const champs=document.querySelectorAll(

        `input.calcA[data-table="${ligne.compte}"][data-devise="${ligne.devise}"]`

    );

    if(champs.length===2){

        champs[0].value=ligne.cloture;

        champs[1].value=ligne.ouverture;

    }

});
    
        /*-----------------------------------------
          Technique B
        -----------------------------------------*/
    
        rapportAudit.B.details = structuredClone(
    
            rapport.B.details
    
        );
        /*-----------------------------------------
  Recharger les champs de la Technique B1
-----------------------------------------*/

rapportAudit.B.details
.filter(ligne=>ligne.controle==="tableB1")
.forEach(ligne=>{

    const ede=document.querySelector(

        `.calcB1[data-devise="${ligne.devise}"][data-type="ede"]`

    );

    const illico=document.querySelector(

        `.calcB1[data-devise="${ligne.devise}"][data-type="illico"]`

    );

    const mpesa=document.querySelector(

        `.calcB1[data-devise="${ligne.devise}"][data-type="mpesa"]`

    );

    if(ede) ede.value=ligne.ede;

    if(illico) illico.value=ligne.illico;

    if(mpesa) mpesa.value=ligne.mpesa;

});
/*-----------------------------------------
  Recharger les champs des Techniques B2 et B3
-----------------------------------------*/

rapportAudit.B.details
.filter(ligne=>ligne.controle!=="tableB1")
.forEach(ligne=>{

    const champs=document.querySelectorAll(

        `input.calcB[data-table="${ligne.controle}"][data-devise="${ligne.devise}"]`

    );

    if(champs.length===2){

        champs[0].value=ligne.valeur1;

        champs[1].value=ligne.valeur2;

    }

});
    
        /*-----------------------------------------
          Technique C
        -----------------------------------------*/
    
        rapportAudit.C.details = structuredClone(
    
            rapport.C.details
    
        );
    
        rapportAudit.C.anomalies = structuredClone(
    
            rapport.C.anomalies
    
        );
        /*-----------------------------------------
  Recharger les tableaux de la Technique C
-----------------------------------------*/

[
    "encaissementsEDE",
    "encaissementsJournal",
    "decaissementsEDD",
    "decaissementsJournal"
].forEach(id=>{

    const tbody=document.getElementById(id);

    if(!tbody) return;

    tbody.innerHTML="";

    const lignes=missionCourante.techniqueC[id]||[];

    if(lignes.length===0){

        ajouterLigne(id);

        return;

    }

    lignes.forEach(()=>{

        ajouterLigne(id);

    });

    const trs=tbody.querySelectorAll("tr");

    lignes.forEach((ligne,index)=>{

        const champs=trs[index].querySelectorAll("input,select");

        champs[0].value=ligne.date;

        champs[1].value=ligne.canal;

        champs[2].value=ligne.libelle;

        champs[3].value=ligne.devise;

        champs[4].value=ligne.montant;

        champs[5].value=ligne.reference;

    });

});

    /*-----------------------------------------
  Rafraîchir toute l'interface
-----------------------------------------*/

calculTechniqueA();

calculTechniqueB();

calculTechniqueC();

updateSummary();

chargerRapports();
    }

    chargerRapports();