<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ArticleUploaded extends Mailable
{
    use Queueable, SerializesModels;
    public $studentName;
    public $articleTitle;

    public function __construct($studentName, $articleTitle){
        $this->studentName = $studentName;
        $this->articleTitle = $articleTitle;
    }

    public function build()
    {
        return $this->subject('New Article Uploaded by ' . $this->studentName)
                    ->view('emails.article_uploaded');
    }


    public function envelope()
    {
        return new Envelope(
            subject: 'Article Uploaded',
        );
    }

    /**
     * Get the message content definition.
     *
     * @return \Illuminate\Mail\Mailables\Content
     */
    public function content()
    {
        return new Content(
            view: 'view.name',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array
     */
    public function attachments()
    {
        return [];
    }
}
