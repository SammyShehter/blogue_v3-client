import React from 'react'

export const ArticlePreview = ({ link }) => {

    const convert = (t) => {
        const dt = new Date(t);
        const hr = dt.getUTCHours();
        const m = "0" + dt.getUTCMinutes();
        
        return hr + ':' + m.substring(-2)
      }

    const expiresIn = () => {
        const now = Date.now()
        if(now > link.expDate) {
            return 'Link expired'
        } else {
            return convert(link.expDate - now)
        }
        
    }

    return (
        <>
            <h2>Link</h2>

            <p>
                Short Link:{' '}
                <a href={link.to} target='_blank' rel='noopener noreferrer'>
                    {link.to}
                </a>
            </p>
            <p>
                Original Link:{' '}
                <a href={link.from} target='_blank' rel='noopener noreferrer'>
                    {link.from}
                </a>
            </p>
            <p>
                Click count: <strong>{link.clicks}</strong>
            </p>
            <p>
                Expiration: <strong>{expiresIn()}</strong>
            </p>
        </>
    )
}
