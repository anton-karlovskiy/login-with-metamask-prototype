
interface Props {
  children: React.ReactNode;
}

function Card({ children }: Props) {
  return (
    <div
      // TODO: could use tailwindcss
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '20rem',
        padding: '1rem',
        margin: '1rem',
        overflow: 'auto',
        border: '1px solid',
        borderRadius: '1rem'
      }}>
      {children}
    </div>
  );
}

export default Card;
