import React from 'react';
import { Confirmation } from '../../shared/components/Confirmation';

export function PlantConfirmation() {
  return <Confirmation 
    icon="hug"
    title="Tudo certo."
    subtitle="Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com bastante amor."
    buttonTitle="Muito obrigado :D"
    nextScreen="MyPlants"
  />
}
