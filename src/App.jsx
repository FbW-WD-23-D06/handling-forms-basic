import { useState } from "react"; // Destructuring import der Methode useState
// import react from "react" -> React.useState
import "./App.css";

// Überschrift: FORM Daten im React zum sammeln, speichern und abschicken an eine API
// Beispiel: Login mit Username und passwort
// Standard FORM als HTML Tags und Attribute
// Im React binden wir den aktuellen Wert immer an das Attribut "value" und können diese per useState oder useContext aufrufen
// Im React können wir die DOM Events per on+eventName auslöschen z.B. onClick, onChange, onSubmit
// onChange vom input per useState binding immer das Update für z.B. userName über setUserName
// Per Absenden vom Formular mit ENTER oder Submit Click können wir das ganze Formular per JavaScript absenden mit dem onSubmit
function App() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Boolean für Conditional Rendering

  // const handleChange = async (e) =>{
  //   setUserName(e.target.value);
  //   // document.getElementById("password").value;
  // }

  // Ziel: Senden aller Formular Daten an eine API mit dem richtigen HTTP Methode und aller korrekten gesammelten Daten
  const handleAppSubmit = async (e) => {
    e.preventDefault(); // Verhindern vom Standard Verhalten eines FORM Tags
    if (userName === "" || password === "") {
      // Überprüfung auf korrekte Daten oder per required
      alert("Please fullfill all inputs!");
    } else {
      // Wir möchten an die API ein Objekt schicken, weil der Server die Objekte am besten verarbeiten kann und wir das JavaScript Objekt zu einem JSON Objekt umwandeln können
      const dataToSend = {
        // Zuweisung eures Objektes per Key:Value z.B. mit nur den useStates oder per selbst definierten Key
        // currentUserName: userName,
        // currentPassword: password
        userName,
        password,
      };
      // z.B. {userName: "florian", password: "123"} -> JavaScript Objekt
      // Problem: Das ist ein JavaScript Objekt
      // Austauschkonzept HTTP REST API: akzeptiert nur JSON Daten
      const requestDataToSend = JSON.stringify(dataToSend);
      // zB. {"userName": "florian", "password": "123"} -> JSON Objekt
      // Ziel: Senden meiner Daten an eine API
      // HTTP verschiedene Methoden und jede Methode hat verschiedene Parameter z.B. url parameter (/deltepost/1), query parameter (?query="dci"&lang="de"&browser="chrome"), body (Datenaustauschkonstrukte = JSON)
      try {
        const data = await fetch("/api/v1/login", {
          // Richtiger POST Endpunkt
          // fetch führt Standardmäßig eine HTTP GET Anfrage durch, d.h. für jede andere HTTP Anfrage müssen wir selber unseren HTTP Head und HTTP Body bauen, indem wir ein zweiten Paramter als Objekt an fetch übergen
          method: "POST",
          body: requestDataToSend, // Hier muss dann auch JSON stehen z.B. per JSON.stringify()
          headers: {
            "Content-Type": "application/json", // Wir müssen der API sagen, welches Datenaustauschkonstrukt wir verwenden, in unserem Fall zu 99% JSON
          },
        });
        console.log(data);
        if (data.status === 404) {
          // VORSICHT: In einer echten Anwendung sollte hier 200 stehen
          // Status Code 200 steht für "OK"
          alert("Login approved");
          setPassword("");
          setUserName("");
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.log(error);
        alert("An Error occured!");
      }
    }
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        <form className="form-app" onSubmit={handleAppSubmit}>
          <label>Username</label>
          {/* <input type="text" value={userName} onChange={handleChange}/> */}
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="User Name"
            required
          />
          {/* <input type="email"/> Vorteil: wir haben automatisch eine REGEX Erkennung B@B.B */}
          <label>Passwort</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {/* <input type="submit" value="Senden"/> */}
          <button type="submit">Senden</button>
        </form>
      ) : (
        <div>
          <p>you are logged in</p>
          <button onClick={() => setIsLoggedIn(false)}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default App;
