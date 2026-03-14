"use client";

import { useEffect } from "react";

export default function Journee() {

  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");

    const handleScroll = () => {
      reveals.forEach((el) => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) {
          el.classList.add("active");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* GOOGLE FONT */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap"
        rel="stylesheet"
      />

      {/* ================= JOURNÉE TYPE ================= */}
      <section className="journee reveal">

        <h2>Une Journée à lÉcole Al Amad</h2>

        <div className="timeline">

          {[
            ["08:00","Accueil des Élèves","Accueil chaleureux dans un environnement sécurisé favorisant le bien-être et la motivation."],
            ["09:00","Cours Interactifs","Apprentissage dynamique basé sur la participation et la compréhension active."],
            ["11:00","Activités Créatives","Développement de la créativité grâce aux ateliers artistiques et pédagogiques."],
            ["12:30","Pause Déjeuner","Moment de détente et de socialisation dans un cadre encadré."],
            ["14:00","Ateliers & Projets","Travail collaboratif pour renforcer l’autonomie et l’esprit d’équipe."],
            ["16:00","Fin de Journée","Bilan pédagogique et départ en toute sécurité."]
          ].map((step, i) => (
            <div className="step" key={i}>
              <div className="card">
                <div className="time">{step[0]}</div>
                <h3>{step[1]}</h3>
                <p>{step[2]}</p>
              </div>
              <div className="circle"></div>
            </div>
          ))}

        </div>
      </section>


      {/* ================= ACTIVITÉS ================= */}
      <section className="activites reveal">

        <h2>Activités Parascolaires</h2>

        <div className="activities-grid">

          {[
            ["⚽","Sport","Développement physique et esprit d'équipe à travers différentes disciplines sportives."],
            ["🎨","Arts Créatifs","Dessin, peinture et expression artistique pour stimuler l'imagination."],
            ["🤖","Robotique","Initiation aux technologies modernes et à la pensée logique."],
            ["🎵","Musique","Éveil musical et développement du sens artistique."],
            ["🌍","Langues","Renforcement linguistique pour ouvrir les élèves au monde."],
            ["🧩","Jeux Éducatifs","Apprentissage ludique favorisant réflexion et concentration."]
          ].map((a, i) => (
            <div className="activity" key={i}>
              <div className="icon">{a[0]}</div>
              <h3>{a[1]}</h3>
              <p>{a[2]}</p>
            </div>
          ))}

        </div>
      </section>


      {/* ================= STYLES ================= */}
      <style jsx global>{`

      body{
        margin:0;
        font-family:'Inter',sans-serif;
        background:#f6fbff;
        color:#0b2f4e;
        overflow-x:hidden;
      }

      section{
        padding:90px 8%;
      }

      .reveal{
        opacity:0;
        transform:translateY(60px);
        transition:1s ease;
      }

      .reveal.active{
        opacity:1;
        transform:translateY(0);
      }

      /* JOURNEE */
      .journee{
        background:linear-gradient(135deg,#eaf6ff,#ffffff);
        text-align:center;
      }

      .journee h2{
        font-size:42px;
        margin-bottom:60px;
      }

      .timeline{
        max-width:900px;
        margin:auto;
        position:relative;
      }

      .timeline::before{
        content:"";
        position:absolute;
        left:50%;
        top:0;
        width:4px;
        height:100%;
        background:#57a6e1;
        transform:translateX(-50%);
      }

      .step{
        display:flex;
        align-items:center;
        margin:50px 0;
      }

      .step:nth-child(even){
        flex-direction:row-reverse;
      }

      .card{
        width:45%;
        background:white;
        padding:25px;
        border-radius:20px;
        box-shadow:0 20px 35px rgba(0,0,0,0.08);
        transition:.4s;
      }

      .card:hover{
        transform:translateY(-8px);
      }

      .time{
        font-size:22px;
        font-weight:800;
        color:#57a6e1;
      }

      .circle{
        width:22px;
        height:22px;
        background:#0b2f4e;
        border-radius:50%;
        margin:0 20px;
        z-index:2;
      }

      /* ACTIVITES */

      .activites{
        background:linear-gradient(145deg,#ffffff,#e9f5ff);
        text-align:center;
      }

      .activites h2{
        font-size:42px;
        margin-bottom:60px;
      }

      .activities-grid{
        display:grid;
        grid-template-columns:repeat(auto-fit,minmax(250px,1fr));
        gap:30px;
      }

      .activity{
        background:white;
        padding:35px;
        border-radius:25px;
        box-shadow:0 20px 35px rgba(0,0,0,.08);
        transition:.4s;
        position:relative;
        overflow:hidden;
      }

      .activity:hover{
        transform:translateY(-10px) scale(1.03);
      }

      .icon{
        font-size:45px;
        margin-bottom:15px;
      }

      .activity p{
        color:#35576d;
      }

      .activity::before{
        content:"";
        position:absolute;
        width:200px;
        height:200px;
        background:rgba(87,166,225,.15);
        border-radius:50%;
        top:-60px;
        right:-60px;
        filter:blur(60px);
      }

      @media(max-width:768px){

        .timeline::before{
          left:8px;
        }

        .step{
          flex-direction:column !important;
          align-items:flex-start;
        }

        .card{
          width:100%;
          margin-left:30px;
        }

        .circle{
          margin:15px 0;
        }
      }

      `}</style>
    </>
  );
}