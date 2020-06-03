import React from "react";
import { render } from "react-dom";

import Autocomplete from "./Autocomplete";


function SuggestedInput() {
  return (
    <div>
      <Autocomplete
        suggestions={[
          "Acnesol Gel",
          "Ambrodil Syrup",
          "Ascoril LS Syrup",
          "Azee 500 Tablet",
          "Ambrodil-S Syrup",
          "Acnestar Gel",
          "Axcer  90mg Tablet",
          "Asthakind-DX Syrup Sugar Free",
          "Acitrom 2 Tablet",
          "Amaryl 1mg Tablet",
          "Acivir Cream",
          "Ascabiol Emulsion",
          "Aerocort Inhaler",
          "Acnesol A Nano Gel",
          "Alivher Tablet",
          "Atorva 20 Tablet",
          "Cymax O 200mg/200mg Tablet",
          "Doberol Capsule",
          "Diclotal Forte  50 mg/325 mg Tablet",
          "Dorikem 500mg Kit",
          "Dermashine Lotion",
          "Z-Cyp Syrup",
          "Panseal D Capsule",
          "Pancyte-D 30mg/40mg Capsule",
          "Merotar 250mg Injection",
          "Metalgin Syrup",
          "Menflox LB 200mg Tablet",
          "Ofloxa T 200mg/600mg Capsule",
          "Omisen 20mg Capsule",
          "Oflovel 400mg Tablet",
          "Oprucet LM 5mg/10mg Tablet",
          "Ofrin 50mg Dry Syrup",
          "Rexipra FX 10 Tablet",
          "Sancoril Expectorant",
          "Sunibutol 600mg Tablet",
          "Speedon-P 100mg/500mg Tablet",
          "Oftak 200 Tablet",
          "Lamicet M 5mg/10mg Tablet",
          "Loxzol Nasal Drops",
          "Fensec 20mg Capsule",
          "Eteez 0.25mg Tablet",
          "Cefu 750mg Injection",
          "Cortis-TR Injection",
          "Cyproline Syrup",
          "Fepit 150mg Tablet",
          "Flumax 200mg Tablet",
          "Finbrom Eye Drop",
        ]}
      />
    </div>
  );
}
export default SuggestedInput;