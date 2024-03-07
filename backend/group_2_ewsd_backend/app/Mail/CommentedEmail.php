<?php

namespace App\Mail;

use App\Mail\CommentedEmail;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Contracts\Queue\ShouldQueue;

class CommentedEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $commentername;
    public $comment;
    public $contribution;
    public function __construct($commentername,$comment,$contribution)
    {
        //
        $this->commentername = $commentername;
        $this->comment = $comment;
        $this->contribution = $contribution;
    }

    public function build(){
        return $this->subject('New Commented in Contribution')
                    ->view('mail.commented_email');
    }
    public function envelope()
    {
        return new Envelope(
            subject: 'New Commented in Contribution',
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
            view: 'mail.commented_email',
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
