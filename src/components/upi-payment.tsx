'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { formatCurrency } from '@/lib/utils'
import { useLocale, useTranslations } from 'next-intl'
import { useState } from 'react'
import { Smartphone, Copy, Check } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

type Props = {
  amount: number
  currency: string
  payeeName: string
  payerName: string
  note?: string
  children?: React.ReactNode
}

export function UPIPayment({ 
  amount, 
  currency, 
  payeeName, 
  payerName, 
  note,
  children 
}: Props) {
  const locale = useLocale()
  const t = useTranslations('UPIPayment')
  const { toast } = useToast()
  const [upiId, setUpiId] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const generateUPILink = (upiId: string) => {
    const paymentNote = note || `Splitify: ${payerName} to ${payeeName}`
    const upiLink = `upi://pay?pa=${upiId}&pn=${payeeName}&am=${amount}&cu=INR&tn=${encodeURIComponent(paymentNote)}`
    return upiLink
  }

  const handlePayment = () => {
    if (!upiId.trim()) {
      toast({
        title: "UPI ID Required",
        description: "Please enter the payee's UPI ID",
        variant: "destructive",
      })
      return
    }

    const upiLink = generateUPILink(upiId)
    
    // Try to open UPI app
    try {
      window.location.href = upiLink
      setIsDialogOpen(false)
      toast({
        title: "Payment Initiated",
        description: "Complete the payment in your UPI app",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Unable to open UPI app. Please try again.",
        variant: "destructive",
      })
    }
  }

  const copyUPILink = async () => {
    if (!upiId.trim()) return
    
    const upiLink = generateUPILink(upiId)
    
    try {
      // Try modern clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(upiLink)
      } else {
        // Fallback for localhost/http
        const textArea = document.createElement('textarea')
        textArea.value = upiLink
        textArea.style.position = 'fixed'
        textArea.style.left = '-999999px'
        textArea.style.top = '-999999px'
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
      }
      
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      toast({
        title: "Link Copied",
        description: "UPI payment link copied to clipboard",
      })
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Could not copy link. Please copy manually.",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button size="sm" className="gap-2">
            <Smartphone className="w-4 h-4" />
            Pay via UPI
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Pay via UPI</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">
            <p><strong>Amount:</strong> {formatCurrency(currency, amount, locale)}</p>
            <p><strong>From:</strong> {payerName}</p>
            <p><strong>To:</strong> {payeeName}</p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="upi-id">Payee&apos;s UPI ID</Label>
            <Input
              id="upi-id"
              type="text"
              placeholder="e.g., name@paytm, 9876543210@ybl"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Enter the UPI ID of the person you want to pay
            </p>
          </div>

          <div className="flex gap-2">
            <Button onClick={handlePayment} className="flex-1">
              <Smartphone className="w-4 h-4 mr-2" />
              Pay Now
            </Button>
            <Button 
              variant="outline" 
              onClick={copyUPILink}
              disabled={!upiId.trim()}
            >
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>

          <div className="text-xs text-muted-foreground border-t pt-4">
            <p><strong>How it works:</strong></p>
            <ol className="list-decimal list-inside space-y-1 mt-2">
              <li>Enter the payee&apos;s UPI ID</li>
              <li>Click &quot;Pay Now&quot; to open your UPI app</li>
              <li>Complete the payment in your UPI app</li>
              <li>Come back and mark the expense as paid</li>
            </ol>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
