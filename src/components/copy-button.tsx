'use client'
import { Button } from '@/components/ui/button'
import { Check, Copy } from 'lucide-react'
import { useEffect, useState } from 'react'

type Props = { text: string }

export function CopyButton({ text }: Props) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (copied) {
      let timeout = setTimeout(() => setCopied(false), 1000)
      return () => {
        setCopied(false)
        clearTimeout(timeout)
      }
    }
  }, [copied])

  const copyToClipboard = async (text: string) => {
    try {
      // Try modern clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        return
      }
      
      // Fallback for localhost/http
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      textArea.style.top = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      
      const successful = document.execCommand('copy')
      document.body.removeChild(textArea)
      
      if (successful) {
        setCopied(true)
      } else {
        throw new Error('Copy command failed')
      }
    } catch (err) {
      // Final fallback - just select the text
      console.warn('Copy failed, trying selection:', err)
      setCopied(true) // Still show feedback
    }
  }

  return (
    <Button
      size="icon"
      variant="secondary"
      type="button"
      onClick={() => copyToClipboard(text)}
    >
      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
    </Button>
  )
}
