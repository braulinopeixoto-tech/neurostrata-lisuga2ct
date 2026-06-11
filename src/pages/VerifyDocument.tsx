import { useParams } from 'react-router-dom'
import { PublicCertificateVerification } from '@/components/sensetrust/PublicCertificateVerification'

export default function VerifyDocument() {
  const { id: token } = useParams()
  return <PublicCertificateVerification token={token} />
}
