
import "./CSS/CompareStart.css";

// --- components/CompareArea.jsx ---
export function CompareStart({ 
    onRecompare 
  }) {

  return (
<div className="sticky-footer"> 
  
  <button className="btn-primary green btn-start" 
  onClick={onRecompare}>
     Aloita </button>
      </div> 
  );
}