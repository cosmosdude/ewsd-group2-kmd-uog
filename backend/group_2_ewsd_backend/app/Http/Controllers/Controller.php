<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    public function sendResponse($result, $message, $status_code = 200)
    {
        $response = [
            'success' => true,
            'data'    => $result,
            'message' => $message,
        ];
        return response()->json($response, $status_code);
    }

    public function sendError($error, $errorMessages = [], $code = 404)
    {
        $response = [
            'success' => false,
            'message' => $error,
        ];

        if (!empty($errorMessages)) {
            $response['data'] = $errorMessages;
        }

        return response()->json($response, $code);
    }
    public function timeDifference($studentLastAccess)
    {
        $currentTime = Carbon::now();
        $studentLastAccess = Carbon::parse($studentLastAccess);
        $timeDifference = $currentTime->diff($studentLastAccess);
        if ($timeDifference->days == 0 && $timeDifference->h == 0 && $timeDifference->i == 0) {
            return '00 minutes ago';
        }

        if ($timeDifference->days == 0 && $timeDifference->h == 0) {
            return $timeDifference->i . ' minutes ago';
        }

        if ($timeDifference->days == 0) {
            return $timeDifference->h . ' hours and ' . $timeDifference->i . ' minutes ago';
        }

        if ($timeDifference->days == 1) {
            return 'Yesterday ' . $timeDifference->format('%h AM or %h PM') . ' and ' . $timeDifference->i . ' minutes ago';
        }

        if ($timeDifference->days <= 2) {
            return 'Yesterday ' . $studentLastAccess->format('g:i A');
        }

        return $studentLastAccess->format('d-m-Y g:i A');
    }
}
