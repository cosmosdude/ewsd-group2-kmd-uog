<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class FileUploaded extends Mailable
{
    use Queueable, SerializesModels;

    public $subject;
    public $content;
    public $filePath;

    public function __construct()
    {
        //
        $this->subject = $subject;
        $this->content = $content;
        $this->uploadedFiles=$uploadedFiles;
        $this->uploadedImages=$uploadedImages;
    }

    public function build(){
        return $this->subject($this->subject)
                    ->view('emails.article_uploaded')
                    ->attach(public_path($this->uploadedFiles))
                    ->attach(public_path($this->uploadedImages));
    }

    public function envelope()
    {
        return new Envelope(
            subject: 'File Uploaded',
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
