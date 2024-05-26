import './preview.css';
import '../index.css';

interface PreviewProps {
    code: string
}



const Preview: React.FC<PreviewProps> = ({ code }) => {

    return(
      <>
        <div className='preview-wrapper'>
          <div className='heading'>Transpiled Code</div>
          <pre className='pre-container'>{code}</pre>
        </div>
      </>
    );
};

export default Preview;