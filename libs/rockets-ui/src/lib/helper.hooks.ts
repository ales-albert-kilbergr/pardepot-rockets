import * as React from 'react';

export function useIsIgameBroken(imageUrl?: string) {
  const [isImageBroken, setImageBroken] = React.useState(false);

  React.useEffect(() => {
    if (!imageUrl) {
      setImageBroken(true);
    } else {
      const img = new Image();
      img.addEventListener('error', () => setImageBroken(true));
      img.src = imageUrl;
    }
  }, [imageUrl]);

  return isImageBroken;
}
