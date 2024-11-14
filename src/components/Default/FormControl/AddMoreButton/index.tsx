import Image from 'next/image';

interface PROPS {
  onClick?: () => void;
}

const AddMoreButton = (props: PROPS) => {
  return (
    <div role="button" className={`uploadBox`} onClick={props.onClick}>
      <div>
        <Image src="/assets/images/uploadAdd.png" alt="Downtime" width={25} height={25} />
      </div>
      <p className="b-block">Click to Add More</p>
    </div>
  );
};

export default AddMoreButton;
