import { useParams } from 'react-router-dom'
import { ExpandedPublicVerificationPortal } from '@/components/sensetrust/ExpandedPublicVerificationPortal'

export default function VerifyDocument() {
  const { id: token } = useParams()
  return <ExpandedPublicVerificationPortal token={token} />
}
