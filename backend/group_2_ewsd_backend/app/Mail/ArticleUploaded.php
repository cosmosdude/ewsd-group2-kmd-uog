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
    public $studentname;
    public $coordinatorname;
    public $contribution;

    

    public function __construct($studentname, $coordinatorname, $contribution){
        $this->studentname = $studentname;
        $this->coordinatorname = $coordinatorname;
        $this->$contribution = $contribution;
    }

    public function build()
    {
        return $this->subject('New Article Uploaded by ' . $this->studentname)
                    ->view('mail.article_uploaded');
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
            view: 'mail.article_uploaded',
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
