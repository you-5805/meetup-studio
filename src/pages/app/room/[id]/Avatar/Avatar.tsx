type Props = {
  img: string;
};

export const Avatar = ({ img }: Props) => {
  if (img.includes('https')) {
    return <img height={32} width={32} src={img} alt='' className='rounded-full' />;
  } else {
    return (
      <svg width='32' height='32' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <circle cx='32' cy='32' r='32' fill={img} fillOpacity='0.63' />
        <path
          d='M32 11C34.3869 11 36.6761 12.0799 38.364 14.0022C40.0518 15.9244 41 18.5315 41 21.25C41 23.9685 40.0518 26.5756 38.364 28.4978C36.6761 30.4201 34.3869 31.5 32 31.5C29.6131 31.5 27.3239 30.4201 25.636 28.4978C23.9482 26.5756 23 23.9685 23 21.25C23 18.5315 23.9482 15.9244 25.636 14.0022C27.3239 12.0799 29.6131 11 32 11ZM32 36.625C41.945 36.625 50 41.2119 50 46.875V52H14V46.875C14 41.2119 22.055 36.625 32 36.625Z'
          fill='white'
        />
      </svg>
    );
  }
};
