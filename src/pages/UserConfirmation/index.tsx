import React from 'react';
import { Confirmation } from '../../shared/components/Confirmation';

export function UserConfirmation() {
  return <Confirmation 
    icon="smile"
    title="Prontinho"
    subtitle="Agora vamos começar a cuidar das suas plantinhas com muito cuidado."
    buttonTitle="Começar"
    nextScreen="PlantSelect"
  />
}
