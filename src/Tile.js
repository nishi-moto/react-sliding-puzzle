function Tile(props) {
  // props.correctPostition !== null ? props.correctPostition+1 : null
  return (
    
    <div className="Tile">
     current position: { props.currentPosition !== null ? props.currentPosition+1 : null}
     <br/>
     correct position: { props.correctPosition !== null ? props.correctPosition+1 : null}
    </div>
  );
}

export default Tile;
