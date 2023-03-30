import { useSelector } from 'react-redux';

const EditorStats = () => {
  const { face } = useSelector((state) => state.selected);

  return <div>{face}</div>;
};

export default EditorStats;
