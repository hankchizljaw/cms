(function($) {


var $s3AccessKeyIdInput = $('.s3-key-id'),
    $s3SecretAccessKeyInput = $('.s3-secret-key')
    $s3BucketSelect = $('.s3-bucket-select > select'),
    $s3RefreshBucketsBtn = $('.s3-refresh-buckets'),
    $s3RefreshBucketsSpinner = $s3RefreshBucketsBtn.parent().next().children(),
    $s3UrlPrefixInput = $('.s3-url-prefix'),
    $s3BucketLocationInput = $('.s3-bucket-location'),
    refreshingS3Buckets = false;

$s3RefreshBucketsBtn.click(function()
{
    if ($s3RefreshBucketsBtn.hasClass('disabled'))
    {
        return;
    }

    $s3RefreshBucketsBtn.addClass('disabled');
    $s3RefreshBucketsSpinner.removeClass('hidden');

    var data = {
        keyId:  $s3AccessKeyIdInput.val(),
        secret: $s3SecretAccessKeyInput.val()
    };

    Craft.postActionRequest('assetSources/getS3Buckets', data, function(response, textStatus)
    {
        $s3RefreshBucketsBtn.removeClass('disabled');
        $s3RefreshBucketsSpinner.addClass('hidden');

        if (textStatus == 'success')
        {
            if (response.error)
            {
                alert(response.error);
            }
            else if (response.length > 0)
            {
                var currentBucket = $s3BucketSelect.val(),
                    currentBucketStillExists = false;

                refreshingS3Buckets = true;

                $s3BucketSelect.prop('disabled', false).empty();

                for (var i = 0; i < response.length; i++)
                {
                    if (response[i].bucket == currentBucket)
                    {
                        currentBucketStillExists = true;
                    }

                    $s3BucketSelect.append('<option value="'+response[i].bucket+'" data-url-prefix="'+response[i].url_prefix+'" data-location="'+response[i].location+'">'+response[i].bucket+'</option>');
                }

                if (currentBucketStillExists)
                {
                    $s3BucketSelect.val(currentBucket);
                }

                refreshingS3Buckets = false;

                if (!currentBucketStillExists)
                {
                    $s3BucketSelect.trigger('change');
                }
            }
        }
    });
});

$s3BucketSelect.change(function()
{
    if (refreshingS3Buckets)
    {
        return;
    }

    var $selectedOption = $s3BucketSelect.children('option:selected');

    $s3UrlPrefixInput.val($selectedOption.data('url-prefix'));
    $s3BucketLocationInput.val($selectedOption.data('location'));
});



var $rackspaceUsernameInput = $('.rackspace-username'),
    $rackspaceApiKeyInput = $('.racskspace-api-key'),
    $rackspaceLocationSelect = $('.rackspace-location-select > select'),
    $rackspaceContainerSelect = $('.rackspace-container-select > select'),
    $rackspaceRefreshContainersBtn = $('.rackspace-refresh-containers'),
    $rackspaceRefreshContainersSpinner = $rackspaceRefreshContainersBtn.parent().next().children(),
    $rackspaceUrlPrefixInput = $('.rackspace-url-prefix'),
    refreshingRackspaceContainers = false;

$rackspaceRefreshContainersBtn.click(function()
{
    if ($rackspaceRefreshContainersBtn.hasClass('disabled'))
    {
        return;
    }

    $rackspaceRefreshContainersBtn.addClass('disabled');
    $rackspaceRefreshContainersSpinner.removeClass('hidden');

    var data = {
        username: $rackspaceUsernameInput.val(),
        apiKey:   $rackspaceApiKeyInput.val(),
        location: $rackspaceLocationSelect.val()
    };

    Craft.postActionRequest('assetSources/getRackspaceContainers', data, function(response, textStatus)
    {
        $rackspaceRefreshContainersBtn.removeClass('disabled');
        $rackspaceRefreshContainersSpinner.addClass('hidden');

        if (textStatus == 'success')
        {
            if (response.error)
            {
                alert(response.error);
            }
            else if (response.length > 0)
            {
                var currentContainer = $rackspaceContainerSelect.val(),
                    currentContainerStillExists = false;

                refreshingRackspaceContainers = true;

                $rackspaceContainerSelect.prop('disabled', false).empty();

                for (var i = 0; i < response.length; i++)
                {
                    if (response[i].bucket == currentContainer)
                    {
                        currentContainerStillExists = true;
                    }

                    $rackspaceContainerSelect.append('<option value="'+response[i].container+'" data-urlPrefix="'+response[i].urlPrefix+'">'+response[i].container+'</option>');
                }

                if (currentContainerStillExists)
                {
                    $rackspaceContainerSelect.val(currentContainer);
                }

                refreshingRackspaceContainers = false;

                if (!currentContainerStillExists)
                {
                    $rackspaceContainerSelect.trigger('change');
                }
            }
        }
    });
});

$rackspaceContainerSelect.change(function()
{
    if (refreshingRackspaceContainers)
    {
        return;
    }

    var $selectedOption = $rackspaceContainerSelect.children('option:selected');

    $rackspaceUrlPrefixInput.val($selectedOption.data('url-prefix'));
});



var $googleAccessKeyIdInput = $('.google-key-id'),
    $googleSecretAccessKeyInput = $('.google-secret-key')
    $googleBucketSelect = $('.google-bucket-select > select'),
    $googleRefreshBucketsBtn = $('.google-refresh-buckets'),
    $googleRefreshBucketsSpinner = $googleRefreshBucketsBtn.parent().next().children(),
    $googleUrlPrefixInput = $('.google-url-prefix'),
    refreshingGoogleBuckets = false;

$googleRefreshBucketsBtn.click(function()
{
    if ($googleRefreshBucketsBtn.hasClass('disabled'))
    {
        return;
    }

    $googleRefreshBucketsBtn.addClass('disabled');
    $googleRefreshBucketsSpinner.removeClass('hidden');

    var data = {
        keyId:  $googleAccessKeyIdInput.val(),
        secret: $googleSecretAccessKeyInput.val()
    };

    Craft.postActionRequest('assetSources/getGoogleCloudBuckets', data, function(response, textStatus)
    {
        $googleRefreshBucketsBtn.removeClass('disabled');
        $googleRefreshBucketsSpinner.addClass('hidden');

        if (textStatus == 'success')
        {
            if (response.error)
            {
                alert(response.error);
            }
            else if (response.length > 0)
            {
                var currentBucket = $googleBucketSelect.val(),
                    currentBucketStillExists = false;

                refreshingGoogleBuckets = true;

                $googleBucketSelect.prop('disabled', false).empty();

                for (var i = 0; i < response.length; i++)
                {
                    if (response[i].bucket == currentBucket)
                    {
                        currentBucketStillExists = true;
                    }

                    $googleBucketSelect.append('<option value="'+response[i].bucket+'" data-url-prefix="'+response[i].url_prefix+'">'+response[i].bucket+'</option>');
                }

                if (currentBucketStillExists)
                {
                    $googleBucketSelect.val(currentBucket);
                }

                refreshingGoogleBuckets = false;

                if (!currentBucketStillExists)
                {
                    $googleBucketSelect.trigger('change');
                }
            }
        }
    });
});

$googleBucketSelect.change(function()
{
    if (refreshingGoogleBuckets)
    {
        return;
    }

    var $selectedOption = $googleBucketSelect.children('option:selected');

    $googleUrlPrefixInput.val($selectedOption.data('url-prefix'));
});

})(jQuery);
